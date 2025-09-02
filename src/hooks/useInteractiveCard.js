import { useEffect } from 'react';

export const useInteractiveCard = () => {
    useEffect(() => {
        const cards = document.querySelectorAll('.interactive-card');

        const handleMouseMove = (e) => {
            const card = e.currentTarget;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const rotateY = (x - rect.width / 2) / 6;
            const rotateX = (y - rect.height / 2) / -6;

            const isFeatured = card.classList.contains('featured-card-js');
            const hoverScale = isFeatured ? 1.15 : 1.05;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${hoverScale})`;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        };

        const handleMouseLeave = (e) => {
            const card = e.currentTarget;
            const isFeatured = card.classList.contains('featured-card-js');
            const baseScale = isFeatured ? 1.1 : 1;
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(${baseScale})`;
        };

        cards.forEach(card => {
            card.style.transition = 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            cards.forEach(card => {
                card.removeEventListener('mousemove', handleMouseMove);
                card.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);
};

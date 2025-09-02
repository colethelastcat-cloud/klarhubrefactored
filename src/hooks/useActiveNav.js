import { useState, useEffect } from 'react';

export const useActiveNav = (headerHeight) => {
    const [activeSection, setActiveSection] = useState('home');
    
    useEffect(() => {
        const sections = Array.from(document.querySelectorAll('main section[id]'));
        
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 3;
            
            const currentSection = sections
                .map(section => ({ id: section.id, offsetTop: section.offsetTop }))
                .filter(section => section.offsetTop <= scrollPosition)
                .pop();
                
            setActiveSection(currentSection ? currentSection.id : 'home');
        };
        
        window.addEventListener('scroll', handleScroll);
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, [headerHeight]);
    
    return activeSection;
};

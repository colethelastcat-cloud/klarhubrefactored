import React, { useState, useEffect, useRef } from 'react';

const AuroraBackground = () => {
    const [spots] = useState(() =>
        Array.from({ length: 15 }).map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: `${Math.floor(Math.random() * 300 + 200)}px`,
            parallaxFactor: Math.random() * 0.5 + 0.2,
        }))
    );
    const spotRefs = useRef(spots.map(() => React.createRef()));

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            spotRefs.current.forEach((ref, i) => {
                if (ref.current) {
                    ref.current.style.transform = `translateY(${scrollY * spots[i].parallaxFactor}px)`;
                }
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [spots]);

    return (
        <div className="aurora-background">
            {spots.map((spot, i) => (
                <div
                    key={i}
                    ref={spotRefs.current[i]}
                    className="aurora-spot"
                    style={{ top: spot.top, left: spot.left, width: spot.size, height: spot.size }}
                />
            ))}
        </div>
    );
};

export default AuroraBackground;

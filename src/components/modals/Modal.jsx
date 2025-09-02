import React, { useState, useEffect } from 'react';

const Modal = ({ children, onClose }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setIsAnimating(true);
        const handleEsc = e => e.key === 'Escape' && handleClose();
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.body.style.overflow = 'auto';
            document.removeEventListener('keydown', handleEsc);
        };
    }, []);

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(onClose, 300); // Wait for animation to finish
    };

    return (
        <div onClick={handleClose} className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
             <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
             <div onClick={e => e.stopPropagation()} className={`relative transition-all duration-300 ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                 {children(handleClose)}
             </div>
        </div>
    );
};

export default Modal;

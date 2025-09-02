import React from 'react';

const MobileMenu = ({ isOpen, onScrollTo, onTosClick, onClose }) => {
    if (!isOpen) return null;
    
    const discordLink = "https://discord.gg/bGmGSnW3gQ";
    const navItems = [
        { id: 'features', label: 'Features' },
        { id: 'games', label: 'Supported Games' },
        { id: 'pricing', label: 'Pricing' },
        { id: 'free', label: 'Free Access' },
        { id: 'reviews', label: 'Reviews' },
        { id: 'faq', label: 'FAQ' },
        { id: 'tos', label: 'Terms' }
    ];

    return (
        <div className="fixed top-0 left-0 w-full h-full z-30 bg-theme-dark/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 text-2xl font-bold md-hidden">
            {navItems.map(item => (
                <button key={item.id} onClick={() => {
                    if (item.id === 'tos') {
                        onTosClick();
                    } else {
                        onScrollTo(item.id);
                    }
                    onClose();
                }} className="text-theme-secondary hover:text-klar transition">{item.label}</button>
            ))}
            <div className="mt-4"><a href={discordLink} target="_blank" rel="noopener noreferrer" className="inline-block py-3 px-8 text-xl rounded-lg font-semibold text-center transition bg-klar hover:bg-klar-light text-white">Join Discord</a></div>
        </div>
    );
};

export default MobileMenu;

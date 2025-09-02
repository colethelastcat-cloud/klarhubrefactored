import React, { useState, useEffect } from 'react';

const AIHelperButton = ({ onClick }) => {
    const [showTooltip, setShowTooltip] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowTooltip(false), 7000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="action-button-wrapper fixed bottom-8 right-8 z-40">
             {showTooltip && (
                 <div className="initial-tooltip absolute bottom-full mb-3 right-0 w-max bg-gray-800 text-white text-sm rounded-md px-3 py-1.5 pointer-events-none">
                     Have questions? Ask our AI!
                     <div className="absolute right-4 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-800"></div>
                 </div>
            )}
            <button id="ai-helper-button" onClick={onClick} className="bg-klar/80 hover:bg-klar text-white w-12 h-12 rounded-full flex items-center justify-center pointer-events-auto shadow-lg shadow-klar">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 21v-1.5M15.75 3v1.5m0 16.5v-1.5m3.75-12H21M12 21v-1.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75v16.5M16.5 4.5l-9 15M16.5 19.5l-9-15" /></svg>
            </button>
        </div>
    );
};

export default AIHelperButton;

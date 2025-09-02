import React from 'react';

const Logo = ({ onScrollTo }) => (
    <svg 
        onClick={() => onScrollTo('home')}
        className="h-8 w-auto cursor-pointer" 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12 10 L12 90 L28 90 L28 60 L60 90 L75 90 L40 50 L75 10 L60 10 L28 40 L28 10 L12 10 Z" className="fill-theme-primary stroke-theme-primary" strokeWidth="4"/>
    </svg>
);

export default Logo;

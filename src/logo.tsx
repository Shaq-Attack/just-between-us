import React from 'react';

const JustBetweenUsLogo = () => (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="200" height="200">
        <defs>
            <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" style={{ stopColor: '#B0E0E6', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#7CF5FF', stopOpacity: 1 }} />
            </linearGradient>
        </defs>
        <path
            d="M50,40 Q20,40 20,70 Q20,100 50,100 L50,120 L70,100 L140,100 Q170,100 170,70 Q170,40 140,40 Z"
            fill="url(#grad1)"
            stroke="none"
        />
        <circle cx="60" cy="70" r="10" fill="#1230AE" opacity="0.7" />
        <circle cx="95" cy="70" r="10" fill="#7695FF" opacity="0.7" />
        <circle cx="130" cy="70" r="10" fill="#87CEFA" opacity="0.7" />
    </svg>
);

export default JustBetweenUsLogo;

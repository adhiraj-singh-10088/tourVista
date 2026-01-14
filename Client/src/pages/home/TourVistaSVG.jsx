import React from 'react';
import './TourVistaSVG.css'; // The SVG styling is in here

const TourVistaSVG = () => {
  return (
    <svg
      className="tour-vista-svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        <g id="stars">
            <circle fill="var(--text-primary)" r="2" cx="100" cy="100" opacity="0.8" />
            <circle fill="var(--text-primary)" r="1.5" cx="200" cy="50" opacity="0.6" />
            <circle fill="var(--text-primary)" r="1" cx="300" cy="150" opacity="0.9" />
            <circle fill="var(--text-primary)" r="1.2" cx="400" cy="80" opacity="0.5" />
            <circle fill="var(--text-primary)" r="2.2" cx="500" cy="180" opacity="1" />
            <circle fill="var(--text-primary)" r="1.8" cx="600" cy="120" opacity="0.7" />
        </g>
      </defs>

      {/* Background */}
      <rect width="1600" height="900" fill="var(--bg-page)" />

      {/* Stars */}
      <use href="#stars" x="0" y="0" />
      <use href="#stars" x="600" y="100" />
      <use href="#stars" x="1200" y="-50" />
      <use href="#stars" x="300" y="250" />
      <use href="#stars" x="900" y="200" />

      {/* Moon */}
      <circle cx="1300" cy="200" r="80" fill="var(--text-primary)" opacity="0.8" filter="url(#glow)" />

      {/* Shooting Stars */}
      <g>
        <path d="M 500 0 L 700 200" stroke="var(--text-primary)" strokeWidth="2" opacity="0.7">
            <animate attributeName="d" from="M 500 0 L 700 200" to="M 900 400 L 1100 600" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.7" to="0" dur="4s" repeatCount="indefinite" />
        </path>
         <path d="M 1000 0 L 1100 100" stroke="var(--text-primary)" strokeWidth="1.5">
             <animate attributeName="d" from="M 1000 0 L 1100 100" to="M 1400 400 L 1500 500" dur="3s" begin="1s" repeatCount="indefinite" />
             <animate attributeName="opacity" from="0.7" to="0" dur="3s" begin="1s" repeatCount="indefinite" />
        </path>
      </g>

      {/* Mountains */}
      <path
        d="M -50 950 L -50 600 C 150 500, 350 700, 600 600 C 850 500, 1050 700, 1300 600 C 1550 500, 1650 650, 1650 650 L 1650 950 Z"
        fill="var(--bg-card)"
        opacity="0.6"
      />
      <path
        d="M -50 950 L -50 700 C 200 600, 450 750, 700 650 C 950 550, 1150 720, 1400 650 C 1650 580, 1650 700, 1650 700 L 1650 950 Z"
        fill="var(--bg-card)"
        opacity="0.8"
      />

      {/* Glowing River */}
      <path
        d="M 200,900 C 400,800 600,850 800,750 C 1000,650 1200,700 1400,900"
        fill="none"
        stroke="var(--text-primary)"
        strokeWidth="3"
        opacity="0.4"
        filter="url(#glow)"
      />
    </svg>
  );
};

export default TourVistaSVG;

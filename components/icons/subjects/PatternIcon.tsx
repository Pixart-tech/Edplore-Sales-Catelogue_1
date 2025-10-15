import React from 'react';

export const PatternIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M3 5c4 0 4 8 8 8s4-8 8-8"/>
    <path d="M3 12c4 0 4 8 8 8s4-8 8-8"/>
  </svg>
);

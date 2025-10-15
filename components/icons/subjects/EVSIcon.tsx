import React from 'react';

export const EVSIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
    <path d="M12 2c-3.31 0-6 2.69-6 6 0 2.24 1.23 4.2 3 5.18"></path>
    <path d="M12 22c3.31 0 6-2.69 6-6 0-2.24-1.23-4.2-3-5.18"></path>
  </svg>
);

import React from 'react';

export const AssessmentIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M15.5 2H8.5C7.67 2 7 2.67 7 3.5v17c0 .83.67 1.5 1.5 1.5h10c.83 0 1.5-.67 1.5-1.5V8l-6-6z"></path>
    <path d="M15 2v6h6"></path>
    <path d="m9 15.5 2 2 4-4"></path>
  </svg>
);

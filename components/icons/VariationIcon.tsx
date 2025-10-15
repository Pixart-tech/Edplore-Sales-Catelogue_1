import React from 'react';

export const VariationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="text-amber-600"
    {...props}
  >
    <path d="M12 21V3" />
    <path d="M20 12l-8 8-8-8" />
  </svg>
);
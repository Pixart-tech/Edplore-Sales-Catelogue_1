import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from '../types';

export const AssessmentIcon: React.FC<IconProps> = ({ size = 20, color = '#ca8a04', ...props }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path d="M15.5 2H8.5C7.67 2 7 2.67 7 3.5v17c0 .83.67 1.5 1.5 1.5h10c.83 0 1.5-.67 1.5-1.5V8l-6-6z" />
    <Path d="M15 2v6h6" />
    <Path d="m9 15.5 2 2 4-4" />
  </Svg>
);

import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from '../types';

export const PatternIcon: React.FC<IconProps> = ({ size = 20, color = '#db2777', ...props }) => (
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
    <Path d="M3 5c4 0 4 8 8 8s4-8 8-8" />
    <Path d="M3 12c4 0 4 8 8 8s4-8 8-8" />
  </Svg>
);

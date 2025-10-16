import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from '../types';

export const ArtCraftIcon: React.FC<IconProps> = ({ size = 20, color = '#ea580c', ...props }) => (
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
    <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
    <Path d="M7 15l5-5 5 5" />
    <Path d="M7 9l5 5 5-5" />
  </Svg>
);

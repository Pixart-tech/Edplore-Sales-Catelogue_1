import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from '../types';

export const LanguageIcon: React.FC<IconProps> = ({ size = 20, color = '#0f766e', ...props }) => (
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
    <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <Path d="M13 8H7" />
    <Path d="M17 12H7" />
  </Svg>
);

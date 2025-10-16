import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './types';

export const ChevronDownIcon: React.FC<IconProps> = ({ size = 24, color = '#94a3b8', ...props }) => (
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
    <Path d="M6 9l6 6 6-6" />
  </Svg>
);

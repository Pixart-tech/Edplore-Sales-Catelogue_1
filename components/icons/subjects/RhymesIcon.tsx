import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import type { IconProps } from '../types';

export const RhymesIcon: React.FC<IconProps> = ({ size = 20, color = '#7c3aed', ...props }) => (
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
    <Path d="M9 18V5l12-2v13" />
    <Circle cx={6} cy={18} r={3} />
    <Circle cx={18} cy={16} r={3} />
  </Svg>
);

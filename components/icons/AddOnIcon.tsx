import React from 'react';
import Svg, { Circle, Line } from 'react-native-svg';
import type { IconProps } from './types';

export const AddOnIcon: React.FC<IconProps> = ({ size = 20, color = '#059669', ...props }) => (
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
    <Circle cx={12} cy={12} r={10} />
    <Line x1={12} y1={8} x2={12} y2={16} />
    <Line x1={8} y1={12} x2={16} y2={12} />
  </Svg>
);

import React from 'react';
import Svg, { Line, Path, Rect } from 'react-native-svg';
import type { IconProps } from '../types';

export const MathIcon: React.FC<IconProps> = ({ size = 20, color = '#2563eb', ...props }) => (
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
    <Rect x={4} y={2} width={16} height={20} rx={2} ry={2} />
    <Line x1={8} y1={6} x2={16} y2={6} />
    <Line x1={12} y1={10} x2={12} y2={18} />
    <Line x1={8} y1={14} x2={16} y2={14} />
  </Svg>
);

import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './types';

export const VariationIcon: React.FC<IconProps> = ({ size = 20, color = '#d97706', ...props }) => (
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
    <Path d="M12 21V3" />
    <Path d="M20 12l-8 8-8-8" />
  </Svg>
);

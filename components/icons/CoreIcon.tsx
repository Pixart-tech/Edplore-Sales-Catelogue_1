import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './types';

export const CoreIcon: React.FC<IconProps> = ({ size = 20, color = '#0284c7', ...props }) => (
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
    <Path d="M12 2L2 7l10 5 10-5-10-5z" />
    <Path d="M2 17l10 5 10-5" />
    <Path d="M2 12l10 5 10-5" />
  </Svg>
);

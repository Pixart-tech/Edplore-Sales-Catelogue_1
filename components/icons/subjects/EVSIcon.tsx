import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from '../types';

export const EVSIcon: React.FC<IconProps> = ({ size = 20, color = '#16a34a', ...props }) => (
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
    <Path d="M12 2c-3.31 0-6 2.69-6 6 0 2.24 1.23 4.2 3 5.18" />
    <Path d="M12 22c3.31 0 6-2.69 6-6 0-2.24-1.23-4.2-3-5.18" />
  </Svg>
);

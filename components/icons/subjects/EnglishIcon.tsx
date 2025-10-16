import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from '../types';

export const EnglishIcon: React.FC<IconProps> = ({ size = 20, color = '#dc2626', ...props }) => (
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
    <Path d="M14 3l-10 18h4l2-5h6l2 5h4L10 3zm-2 10h4l-2-5-2 5z" />
  </Svg>
);

import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface PlusIconProps {
  color?: string;
  width?: number;
  height?: number;
}

const PlusIcon: React.FC<PlusIconProps> = ({ 
  color = '#000', 
  width = 24, 
  height = 24 
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path 
        d="M12 4V20M4 12H20" 
        stroke={color} 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default PlusIcon;

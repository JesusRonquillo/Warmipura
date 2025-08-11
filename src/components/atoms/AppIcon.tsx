import React from 'react';
import { Icon } from '@iconify/react';

type IconBaseProps = React.ComponentProps<typeof Icon>;

interface AppIconProps extends Omit<IconBaseProps, 'width' | 'height'> {
  size?: number | string;
}

export const AppIcon: React.FC<AppIconProps> = ({ size, className, ...props }) => {
  const sizeProps = size ? { width: size, height: size } : {};
  return <Icon {...props} {...sizeProps} className={className ?? ''} />;
};

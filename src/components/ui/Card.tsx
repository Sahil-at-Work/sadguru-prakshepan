import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface CardProps {
  children: ReactNode;
  className?: string;
  bordered?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  bordered = true,
  shadow = 'md',
}) => {
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-lg',
  };

  const classes = classNames(
    'bg-white dark:bg-gray-800 rounded-lg p-6',
    bordered && 'border border-gray-200 dark:border-gray-700',
    shadowClasses[shadow],
    className
  );

  return <div className={classes}>{children}</div>;
};

export default Card;
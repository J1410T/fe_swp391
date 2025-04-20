import React from 'react';
import { classNames } from '../../utils/classNames';
import { Loader2 } from 'lucide-react';

interface FptButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'bolded';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  children: React.ReactNode;
}

/**
 * Button component có thể tái sử dụng với nhiều variant và kích thước
 */
export const FptButton: React.FC<FptButtonProps> = ({
  isLoading = false,
  loadingText = 'Đang xử lý...',
  variant = 'primary',
  size = 'md',
  rounded = true,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium focus:outline-none transition-colors';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#FF4D01] to-[#FF9F00] text-white hover:bg-gradient-to-l',
    secondary: 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 disabled:opacity-70',
    outline: 'bg-transparent text-blue-600 border border-blue-600 hover:border-blue-700 hover:text-blue-700 disabled:opacity-70',
    ghost: 'bg-transparent text-blue-600 hover:bg-blue-50 disabled:opacity-70',
    bolded: 'bg-blue-600 text-white px-5 py-3 rounded-full font-medium hover:border-2 hover:border-blue-400 hover:text-white transition-colors hover:bg-blue-700 whitespace-nowrap disabled:bg-blue-400',
  };
  
  const sizeClasses = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-8 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  
  const roundedClasses = rounded ? 'rounded-full' : 'rounded-md';
  
  return (
    <button
      type={props.type || 'button'}
      disabled={isLoading || disabled}
      className={classNames(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        roundedClasses,
        'disabled:cursor-not-allowed',
        className
      )}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin h-5 w-5 mr-3" />
          {loadingText}
        </div>
      ) : children}
    </button>
  );
};

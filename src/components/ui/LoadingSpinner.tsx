import React, { useEffect } from 'react';
import { classNames } from '@/utils/classNames';

export interface LoadingSpinnerProps {
  fullScreen?: boolean;
  className?: string;
  color?: 'orange' | 'blue' | 'white';
}

/**
 * Component hiển thị hiệu ứng loading với animation các ô vuông
 * @param fullScreen - Hiển thị toàn màn hình nếu true
 * @param className - Custom class
 * @param color - Màu sắc: orange, blue, white
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  fullScreen = false,
  className = '',
  color = 'orange',
}) => {
  // Xác định màu sắc dựa trên prop color
  const colorMap = {
    orange: '#F37021', // FPT orange
    blue: '#3b82f6',
    white: '#ffffff',
  };

  const squareColor = colorMap[color];
  
  // CSS keyframes animations
  const styles = `
    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(-10px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes square1 {
      0% { left: calc(0 * 30px); top: calc(0 * 30px); }
      8.333% { left: calc(0 * 30px); top: calc(1 * 30px); }
      100% { left: calc(0 * 30px); top: calc(1 * 30px); }
    }
    
    @keyframes square2 {
      0% { left: calc(0 * 30px); top: calc(1 * 30px); }
      8.333% { left: calc(0 * 30px); top: calc(2 * 30px); }
      16.67% { left: calc(1 * 30px); top: calc(2 * 30px); }
      25.00% { left: calc(1 * 30px); top: calc(1 * 30px); }
      83.33% { left: calc(1 * 30px); top: calc(1 * 30px); }
      91.67% { left: calc(1 * 30px); top: calc(0 * 30px); }
      100% { left: calc(0 * 30px); top: calc(0 * 30px); }
    }
    
    @keyframes square3 {
      0% { left: calc(1 * 30px); top: calc(1 * 30px); }
      16.67% { left: calc(1 * 30px); top: calc(1 * 30px); }
      25.00% { left: calc(1 * 30px); top: calc(0 * 30px); }
      33.33% { left: calc(2 * 30px); top: calc(0 * 30px); }
      41.67% { left: calc(2 * 30px); top: calc(1 * 30px); }
      66.67% { left: calc(2 * 30px); top: calc(1 * 30px); }
      75.00% { left: calc(2 * 30px); top: calc(2 * 30px); }
      83.33% { left: calc(1 * 30px); top: calc(2 * 30px); }
      91.67% { left: calc(1 * 30px); top: calc(1 * 30px); }
      100% { left: calc(1 * 30px); top: calc(1 * 30px); }
    }
    
    @keyframes square4 {
      0% { left: calc(2 * 30px); top: calc(1 * 30px); }
      33.33% { left: calc(2 * 30px); top: calc(1 * 30px); }
      41.67% { left: calc(2 * 30px); top: calc(2 * 30px); }
      50.00% { left: calc(3 * 30px); top: calc(2 * 30px); }
      58.33% { left: calc(3 * 30px); top: calc(1 * 30px); }
      100% { left: calc(3 * 30px); top: calc(1 * 30px); }
    }
    
    @keyframes square5 {
      0% { left: calc(3 * 30px); top: calc(1 * 30px); }
      50.00% { left: calc(3 * 30px); top: calc(1 * 30px); }
      58.33% { left: calc(3 * 30px); top: calc(0 * 30px); }
      66.67% { left: calc(2 * 30px); top: calc(0 * 30px); }
      75.00% { left: calc(2 * 30px); top: calc(1 * 30px); }
      100% { left: calc(2 * 30px); top: calc(1 * 30px); }
    }
    
    @keyframes squarefadein {
      0% { transform: scale(0.75); opacity: 0; }
      100% { transform: scale(1.0); opacity: 1; }
    }
    
    .loading-page {
      position: fixed;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #ffffff;
      z-index: 9999;
      animation: fadeIn 0.3s ease-out forwards;
    }
    
    .loading-logo {
      margin-bottom: 30px;
      width: 160px;
      height: auto;
    }
    
    .loading-container {
      position: relative;
      width: 146px;
      height: 86px;
      margin: 10px auto;
    }
    
    .loading-square {
      position: absolute;
      width: 26px;
      height: 26px;
      border-radius: 0.125rem;
      background-color: ${squareColor};
      opacity: 0;
    }
    
    .square1 {
      animation: square1 2.4s 0.2s ease-in-out infinite, squarefadein 0.4s ease-out forwards;
      animation-delay: 0.1s;
    }
    
    .square2 {
      animation: square2 2.4s 0.2s ease-in-out infinite, squarefadein 0.4s ease-out forwards;
      animation-delay: 0.1s;
    }
    
    .square3 {
      animation: square3 2.4s 0.2s ease-in-out infinite, squarefadein 0.4s ease-out forwards;
      animation-delay: 0.2s;
    }
    
    .square4 {
      animation: square4 2.4s 0.2s ease-in-out infinite, squarefadein 0.4s ease-out forwards;
      animation-delay: 0.3s;
    }
    
    .square5 {
      animation: square5 2.4s 0.2s ease-in-out infinite, squarefadein 0.4s ease-out forwards;
      animation-delay: 0.4s;
    }

    .loading-text {
      font-family: 'Arial', sans-serif;
      font-size: 16px;
      color: #666;
      margin-top: 20px;
    }
  `;
  
  // Inject CSS styles into document head
  useEffect(() => {
    // Create a style element
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
    
    // Cleanup
    return () => {
      document.head.removeChild(styleElement);
    };
  }, [styles]);
  
  // Force reflow to ensure animation runs properly
  useEffect(() => {
    const squares = document.querySelectorAll('.loading-square');
    squares.forEach(square => {
      // Trigger reflow
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      (square as HTMLElement).offsetHeight;
    });
    
    // Hide the body content when fullScreen loading is shown
    if (fullScreen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [fullScreen]);

  // Component hiển thị animation các ô vuông
  const LoadingAnimation = () => (
    <div className="loading-container">
      <div className="loading-square square1" style={{ left: 'calc(0 * 30px)', top: 'calc(0 * 30px)' }} />
      <div className="loading-square square2" style={{ left: 'calc(0 * 30px)', top: 'calc(1 * 30px)' }} />
      <div className="loading-square square3" style={{ left: 'calc(1 * 30px)', top: 'calc(1 * 30px)' }} />
      <div className="loading-square square4" style={{ left: 'calc(2 * 30px)', top: 'calc(1 * 30px)' }} />
      <div className="loading-square square5" style={{ left: 'calc(3 * 30px)', top: 'calc(1 * 30px)' }} />
    </div>
  );

  // Nếu fullScreen, hiển thị như một trang loading độc lập
  if (fullScreen) {
    return (
      <div className="loading-page">
        <div style={{ textAlign: 'center' }}>
          <LoadingAnimation />
        </div>
      </div>
    );
  }

  // Hiển thị spinner inline
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className={className}>
      <LoadingAnimation />
    </div>
  );
};

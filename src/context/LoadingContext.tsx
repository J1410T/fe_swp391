import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { LoadingSpinner } from '@/components/ui';

interface LoadingContextType {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  showLoadingFor: (durationMs: number) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
  defaultSpinnerProps?: {
    color?: 'orange' | 'blue' | 'white';
  };
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ 
  children,
  defaultSpinnerProps = { color: 'orange' }
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  
  // Chức năng để bắt đầu loading - sử dụng useCallback để tránh tạo hàm mới mỗi khi render
  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);
  
  // Chức năng để dừng loading
  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);
  
  // Chức năng để hiển thị loading trong một khoảng thời gian nhất định
  const showLoadingFor = useCallback((durationMs: number) => {
    // Xóa timer cũ nếu có
    if (timerId) {
      clearTimeout(timerId);
      setTimerId(null);
    }
    
    // Bắt đầu loading ngay lập tức
    setIsLoading(true);
    
    // Đặt timer để dừng loading sau khoảng thời gian
    const newTimerId = setTimeout(() => {
      setIsLoading(false);
      setTimerId(null);
    }, durationMs);
    
    setTimerId(newTimerId);
  }, [timerId]);
  
  // Kiểm tra trạng thái reload khi component được mount - CHỈ CHẠY MỘT LẦN
  useEffect(() => {
    const isReloading = sessionStorage.getItem('isReloading') === 'true';
    if (isReloading) {
      // Xóa trạng thái trước khi sử dụng để tránh vòng lặp vô hạn
      sessionStorage.removeItem('isReloading');
      // Hiển thị loading trong 2.5 giây 
      showLoadingFor(1500);
    }
  }, []); // Không phụ thuộc vào startLoading để tránh vòng lặp
  
  // Đảm bảo xóa timer khi component unmount
  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);
  
  // Hiển thị loading khi isLoading là true
  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading, showLoadingFor }}>
      {children}
      {isLoading && (
        <LoadingSpinner 
          fullScreen 
          color={defaultSpinnerProps.color}
        />
      )}
    </LoadingContext.Provider>
  );
};

export default LoadingContext;

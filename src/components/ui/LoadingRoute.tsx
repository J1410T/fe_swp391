import React, { useEffect, useState, ReactNode, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useLoading } from '@/context/LoadingContext';

interface LoadingRouteProps {
  children: ReactNode;
  minLoadingTime?: number;
  forceLoading?: boolean;
  alwaysShowOnReload?: boolean;
}

/**
 * Component quản lý hiệu ứng loading khi chuyển trang hoặc khi cần hiển thị loading bắt buộc
 * @param children - Nội dung cần hiển thị
 * @param minLoadingTime - Thời gian tối thiểu hiển thị loading (ms)
 * @param forceLoading - Bắt buộc hiển thị loading khi component được mount
 * @param alwaysShowOnReload - Luôn hiển thị loading khi tải lại trang (F5)
 */
const LoadingRoute: React.FC<LoadingRouteProps> = ({
  children,
  minLoadingTime = 2500,
  forceLoading = false,
  alwaysShowOnReload = true
}) => {
  const location = useLocation();
  const { showLoadingFor } = useLoading();
  const [content, setContent] = useState<ReactNode>(null);
  const [prevPath, setPrevPath] = useState('');
  const firstMount = useRef(true);
  const pathChanged = useRef(false);
  const loadingShown = useRef(false);
  
  // Xử lý hiệu ứng loading khi mount lần đầu và reload
  useEffect(() => {
    // Kiểm tra reload và lưu trạng thái
    window.addEventListener('load', () => {
      const isReloading = sessionStorage.getItem('isReloading') === 'true';
      if (isReloading) {
        sessionStorage.removeItem('isReloading');
        loadingShown.current = true;
        // Hiển thị loading và nội dung sau khi hoàn tất
        showLoadingFor(minLoadingTime);
        setTimeout(() => {
          setContent(children);
          setPrevPath(location.pathname);
          firstMount.current = false;
        }, minLoadingTime);
      }
    });
  }, []); 
  
  // Xử lý khi component được mount lần đầu
  useEffect(() => {
    if (firstMount.current && !loadingShown.current) {
      // Hiển thị loading khi mount lần đầu hoặc forceLoading
      if (forceLoading) {
        showLoadingFor(minLoadingTime);
        
        setTimeout(() => {
          setContent(children);
          setPrevPath(location.pathname);
          firstMount.current = false;
        }, minLoadingTime);
      } else {
        // Hiển thị nội dung ngay lập tức nếu không cần loading
        setContent(children);
        setPrevPath(location.pathname);
        firstMount.current = false;
      }
    }
  }, [children, forceLoading, location.pathname, minLoadingTime, showLoadingFor]);
  
  // Xử lý thay đổi đường dẫn
  useEffect(() => {
    // Không xử lý khi component mới mount hoặc đang trong trạng thái loading
    if (firstMount.current || loadingShown.current) return;
    
    // Kiểm tra nếu là thay đổi đường dẫn
    if (prevPath !== location.pathname) {
      pathChanged.current = true;
      loadingShown.current = true;
      
      // Hiển thị loading khi chuyển trang
      showLoadingFor(minLoadingTime);
      
      setTimeout(() => {
        setContent(children);
        setPrevPath(location.pathname);
        pathChanged.current = false;
        loadingShown.current = false;
      }, minLoadingTime);
    } else if (!pathChanged.current) {
      // Cập nhật content nếu children thay đổi nhưng không phải do thay đổi path
      setContent(children);
    }
  }, [children, location.pathname, minLoadingTime, prevPath, showLoadingFor]);
  
  // Xử lý sự kiện trước khi tải lại trang (F5)
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Đặt trạng thái reload vào sessionStorage
      sessionStorage.setItem('isReloading', 'true');
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  
  return <>{content}</>;
};

export default LoadingRoute;

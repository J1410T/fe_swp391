import { Outlet } from 'react-router-dom';

/**
 * Layout dành cho các trang xác thực như đăng nhập, đăng ký, quên mật khẩu
 */
export const AuthLayout = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/20 p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <img 
            src="/src/assets/images/logo.svg" 
            alt="FPT University" 
            className="h-12 w-auto" 
          />
        </div>
        <div className="rounded-lg border bg-card p-8 shadow-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

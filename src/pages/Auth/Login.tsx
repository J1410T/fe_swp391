import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FptButton } from '@/components/ui/FptButton';
import logoAdmission from '../../assets/images/logo-admission.png';
import logoFpt from '../../assets/images/logo-FPT.png';
import loginBg from '../../assets/images/rightside login.png';
import { useAuth } from '@/context/AuthContext';
import { 
  User, 
  KeyRound, 
  Eye, 
  EyeOff, 
  AlertCircle,
} from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const { login, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Lấy đường dẫn redirect sau khi đăng nhập thành công
  const from = (location.state as { from?: string })?.from || '/';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Vui lòng nhập tên đăng nhập và mật khẩu');
      return;
    }
    
    try {
      const success = await login(username, password);
      if (success) {
        // Lấy thông tin người dùng từ context
        const userRole = user?.role;
        console.log('Đăng nhập thành công, role:', userRole);
        
        // Chuyển hướng dựa trên quyền của người dùng
        if (userRole === 'admin') {
          navigate('/admin/dashboard', { replace: true });
        } else if (userRole === 'staff') {
          navigate('/staff/dashboard', { replace: true });
        } else {
          // Nếu không xác định được quyền, chuyển về trang mặc định
          navigate(from, { replace: true });
        }
      } else {
        setError('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại sau.');
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Phần bên trái - Form đăng nhập */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-8 md:px-16 lg:px-24 py-8 relative">
       
        <div className="absolute inset-0"></div>
        
        <div className="w-full max-w-md z-10 bg-white p-8 rounded-xl shadow-lg">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <img 
              src={logoAdmission} 
              alt="FPT Admission" 
              className="h-20 object-contain drop-shadow-md"
            />
          </div>

          {/* Tiêu đề */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Chào mừng quay lại!</h1>
            <p className="mt-1">
              Hãy <span className="fpt-orange font-medium">Đăng Nhập</span> để vào hệ thống!!!
            </p>
            
           
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            {/* Hiển thị lỗi nếu có */}
            {error && (
              <div className="rounded-md bg-red-50 text-red-600 p-3 text-sm border-l-4 border-red-500 animate-fadeIn">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  {error}
                </div>
              </div>
            )}
            
            {/* Tên đăng nhập */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên đăng nhập
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="caret-orange-600 input-fpt pl-10"
                  placeholder="Nhập tên đăng nhập"
                  required
                />
              </div>
            </div>

            {/* Mật khẩu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật Khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="caret-orange-600 pl-10"
                  placeholder="Nhập mật khẩu"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Ghi nhớ đăng nhập */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-[#F37021] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Ghi nhớ đăng nhập
                </label>
              </div>
            </div>

            {/* Nút đăng nhập */}
            <FptButton variant="primary" size="lg" isLoading={isLoading} type="submit">
              Đăng Nhập
            </FptButton>
          </form>
        </div>
      </div>

      {/* Phần bên phải - Hình ảnh */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        {/* Hiệu ứng bo góc và đổ bóng */}
        <div className="absolute inset-0 rounded-tl-[40px] rounded-bl-[40px] overflow-hidden">
          {/* Hiệu ứng zoom nhẹ khi hover */}
          <div className="absolute inset-0 transition-transform duration-10000 hover:scale-110 ease-in-out">
            <img
              src={loginBg}
              alt="FPT University Campus"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          
          {/* Overlay gradient với các layer để tạo chiều sâu */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30"></div>
          
          {/* Layer mờ để tạo hiệu ứng sương mù nhẹ */}
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>
          
          {/* Nội dung */}
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <div className="text-white text-center px-8 py-8 relative">
              {/* Vòng tròn hiệu ứng hào quang sau logo */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-br from-[#F37021]/30 to-[#FF9D45]/10 blur-xl"></div>
              
              {/* Logo */}
              <img 
                src={logoFpt} 
                alt="FPT Education" 
                className="h-24 mx-auto mb-8 object-contain drop-shadow-md relative z-10 animate-pulse-subtle"
              />
              
              {/* Text với hiệu ứng text gradient */}
              <p className="text-2xl max-w-md mx-auto font-medium relative z-10">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent drop-shadow-md">
                  Hệ thống tuyển sinh trực tuyến Đại học FPT
                </span>
              </p>
              
              {/* Đường kẻ trang trí */}
              <div className="w-20 h-1 bg-gradient-to-r from-[#F37021] to-[#FF9D45] mx-auto mt-8 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 
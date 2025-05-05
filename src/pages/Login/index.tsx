import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import logoAdmission from "../../assets/images/logo-admission.png";
import logoFpt from "../../assets/images/logo-FPT.png";
import loginBg from "../../assets/images/rightside login.png";
import { User, KeyRound, Eye, EyeOff, AlertCircle } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  // Không cần location vì không sử dụng redirectPath
  // const location = useLocation();
  const { login, isLoading, error: authError, user } = useAuth();

  // Không cần redirectPath vì cả admin và staff đều chuyển hướng đến trang admission-methods
  // const redirectPath = (location.state as { from?: string })?.from || "/dashboard";

  // Kiểm tra nếu có lỗi từ AuthContext
  useEffect(() => {
    if (authError) {
      // Xử lý thông báo lỗi từ API
      if (authError.includes("Invalid username or password")) {
        setError("Tên đăng nhập hoặc mật khẩu không đúng");
      } else if (authError.includes("404")) {
        setError("Không thể kết nối đến máy chủ (Lỗi 404)");
      } else {
        setError(authError);
      }
    }
  }, [authError]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Vui lòng nhập tên đăng nhập và mật khẩu");
      return;
    }

    try {
      // Gọi API đăng nhập thông qua AuthContext
      const success = await login(username, password);

      if (success) {
        // Lấy thông tin người dùng từ context
        const userRole = user?.role;
        console.log("Đăng nhập thành công, role:", userRole);

        // Lưu vào localStorage nếu chọn "remember me"
        if (rememberMe) {
          localStorage.setItem("remember_username", username);
        } else {
          localStorage.removeItem("remember_username");
        }

        // Lưu trạng thái đăng nhập vào sessionStorage
        sessionStorage.setItem("isLoggedIn", "true");

        // Chuyển hướng dựa trên quyền của người dùng
        // Cả admin và staff đều được chuyển hướng đến trang admission-methods mặc định
        navigate("/admission-methods", { replace: true });
      }
      // Nếu không thành công, lỗi sẽ được xử lý trong AuthContext và hiển thị qua useEffect
    } catch (err) {
      // Xử lý lỗi kết nối hoặc lỗi không xác định
      if (err instanceof Error) {
        if (err.message.includes("401")) {
          // Lỗi 401 là lỗi xác thực, thường là sai mật khẩu
          setError("Tên đăng nhập hoặc mật khẩu không đúng");
        } else if (err.message.includes("404")) {
          setError("Không thể kết nối đến máy chủ (Lỗi 404)");
        } else if (
          err.message.includes("network") ||
          err.message.includes("Network")
        ) {
          setError(
            "Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet của bạn."
          );
        } else {
          setError(`Có lỗi xảy ra: ${err.message}`);
        }
      } else {
        setError("Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại sau.");
      }
      console.error(err);
    }
  };

  // Tự động điền username nếu đã lưu
  useEffect(() => {
    const savedUsername = localStorage.getItem("remember_username");
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Phần bên trái - Form đăng nhập */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-8 md:px-12 lg:px-16 py-8 relative">
        <div className="w-full max-w-md z-10 bg-white p-6 sm:p-8 rounded-xl shadow-lg">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <img
              src={logoAdmission}
              alt="FPT Admission"
              className="h-16 sm:h-20 object-contain drop-shadow-md"
            />
          </div>

          {/* Tiêu đề */}
          <div className="text-center mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              Chào mừng quay lại!
            </h1>
            <p className="mt-1 text-sm sm:text-base">
              Hãy <span className="text-orange-500 font-medium">Đăng Nhập</span>{" "}
              để vào hệ thống!!!
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4 sm:gap-6">
            {/* Hiển thị lỗi nếu có */}
            {error && (
              <div className="rounded-md bg-red-50 text-red-600 p-3 text-sm border-l-4 border-red-500 animate-fadeIn">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Tên đăng nhập */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
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
                  className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 caret-orange-600 pl-10 transition-all duration-200 text-sm sm:text-base"
                  placeholder="Nhập tên đăng nhập"
                  required
                />
              </div>
            </div>

            {/* Mật khẩu */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
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
                  className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 caret-orange-600 pl-10 transition-all duration-200 text-sm sm:text-base"
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
                  className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-xs sm:text-sm text-gray-700"
                >
                  Ghi nhớ đăng nhập
                </label>
              </div>
            </div>

            {/* Nút đăng nhập */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white font-medium rounded-md shadow-md transition-all duration-200 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-200 text-sm sm:text-base"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Đang xử lý...
                </>
              ) : (
                "Đăng Nhập"
              )}
            </button>
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

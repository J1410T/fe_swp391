import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import {
  usersApi,
  UserCreateRequest,
  UserUpdateRequest,
} from "@/api/resources/users";
import { User } from "@/api/resources/auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  UserCog,
  UserPlus,
  Shield,
  CheckCircle,
  XCircle,
  RefreshCw,
  Save,
  AlertCircle,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface UserFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: User | null;
  onSubmitSuccess: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({
  isOpen,
  onOpenChange,
  initialData = null,
  onSubmitSuccess,
}) => {
  // Get current logged-in user
  const { user: currentUser } = useAuth();

  // Initialize form data with default values
  const [formData, setFormData] = useState<
    UserCreateRequest | UserUpdateRequest
  >({
    username: "",
    password: "",
    email: "",
    role: "staff",
    is_active: true, // Default to active as per API spec
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formState, setFormState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  // Theo dõi các trường có lỗi
  const [fieldErrors, setFieldErrors] = useState<{
    username?: boolean;
    password?: boolean;
    email?: boolean;
    role?: boolean;
  }>({});

  // State để theo dõi việc kiểm tra tên đăng nhập
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);

  // State để theo dõi việc kiểm tra email
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  // Sử dụng useRef để lưu trữ timeout ID cho debounce
  const usernameCheckTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const emailCheckTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if the user being edited is the current logged-in admin
  const isCurrentAdmin: boolean = !!(
    initialData &&
    currentUser &&
    initialData.id === currentUser.id &&
    initialData.role === "admin" &&
    currentUser.role === "admin"
  );

  useEffect(() => {
    if (initialData) {
      // For existing users, explicitly set is_active based on the current value
      // According to API spec, if is_active is undefined or null, treat it as active (true)
      const currentIsActive = initialData.is_active !== false;

      setFormData({
        username: initialData.username,
        email: initialData.email,
        role: initialData.role === "user" ? "staff" : initialData.role,
        is_active: currentIsActive,
      });

      console.log("Initializing form with user data:", {
        ...initialData,
        is_active: currentIsActive,
      });
    } else {
      // Reset form when adding a new user
      // Default to active (true) as per API spec
      setFormData({
        username: "",
        password: "",
        email: "",
        role: "staff",
        is_active: true,
      });
    }
  }, [initialData, isOpen]);

  // Define a type for the field names to make it more type-safe
  type FormField = keyof (UserCreateRequest & UserUpdateRequest);

  const handleChange = (field: FormField, value: string | boolean) => {
    console.log(`Changing field ${field} to value:`, value);

    // Special handling for is_active to ensure it's a boolean
    if (field === "is_active") {
      // According to API spec, is_active is a boolean
      // We'll explicitly set it to true or false
      const boolValue = value === true;
      console.log(`Converting is_active value to boolean: ${boolValue}`);

      setFormData((prev) => ({
        ...prev,
        [field]: boolValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Nếu đang thay đổi tên đăng nhập, kiểm tra xem tên đã tồn tại chưa
      if (field === "username" && typeof value === "string") {
        // Xóa lỗi tên đăng nhập nếu trường rỗng
        if (!value.trim()) {
          setUsernameExists(false);
          setFieldErrors((prev) => ({ ...prev, username: false }));
          return;
        }

        // Kiểm tra tên đăng nhập hợp lệ trước khi gọi API
        if (!/^[a-zA-Z0-9_.-]+$/.test(value) || value.length < 3) {
          return;
        }

        // Nếu đang chỉnh sửa người dùng và tên đăng nhập không thay đổi, không cần kiểm tra
        if (initialData && initialData.username === value) {
          setUsernameExists(false);
          setFieldErrors((prev) => ({ ...prev, username: false }));
          return;
        }

        // Hủy timeout trước đó nếu có
        if (usernameCheckTimeoutRef.current) {
          clearTimeout(usernameCheckTimeoutRef.current);
        }

        // Đặt timeout mới để debounce việc kiểm tra
        usernameCheckTimeoutRef.current = setTimeout(async () => {
          try {
            setIsCheckingUsername(true);

            // Gọi API để kiểm tra tên đăng nhập
            const exists = await usersApi.checkUsernameExists(value);

            // Cập nhật state
            setUsernameExists(exists);

            // Nếu tên đăng nhập đã tồn tại, đánh dấu trường là lỗi
            if (exists) {
              setFieldErrors((prev) => ({ ...prev, username: true }));
            } else {
              // Nếu tên đăng nhập chưa tồn tại, xóa lỗi
              setFieldErrors((prev) => ({ ...prev, username: false }));
            }
          } catch (error) {
            console.error("Error checking username:", error);
          } finally {
            setIsCheckingUsername(false);
          }
        }, 500); // Đợi 500ms sau khi người dùng ngừng gõ
      }

      // Nếu đang thay đổi email, kiểm tra xem email đã tồn tại chưa
      if (field === "email" && typeof value === "string") {
        // Xóa lỗi email nếu trường rỗng
        if (!value.trim()) {
          setEmailExists(false);
          setFieldErrors((prev) => ({ ...prev, email: false }));
          return;
        }

        // Kiểm tra email hợp lệ trước khi gọi API
        if (!/\S+@\S+\.\S+/.test(value)) {
          return;
        }

        // Nếu đang chỉnh sửa người dùng và email không thay đổi, không cần kiểm tra
        if (initialData && initialData.email === value) {
          setEmailExists(false);
          setFieldErrors((prev) => ({ ...prev, email: false }));
          return;
        }

        // Hủy timeout trước đó nếu có
        if (emailCheckTimeoutRef.current) {
          clearTimeout(emailCheckTimeoutRef.current);
        }

        // Đặt timeout mới để debounce việc kiểm tra
        emailCheckTimeoutRef.current = setTimeout(async () => {
          try {
            setIsCheckingEmail(true);

            // Gọi API để kiểm tra email
            const exists = await usersApi.checkEmailExists(value);

            // Cập nhật state
            setEmailExists(exists);

            // Nếu email đã tồn tại, đánh dấu trường là lỗi
            if (exists) {
              setFieldErrors((prev) => ({ ...prev, email: true }));
            } else {
              // Nếu email chưa tồn tại, xóa lỗi
              setFieldErrors((prev) => ({ ...prev, email: false }));
            }
          } catch (error) {
            console.error("Error checking email:", error);
          } finally {
            setIsCheckingEmail(false);
          }
        }, 500); // Đợi 500ms sau khi người dùng ngừng gõ
      }
    }
  };

  const validateForm = () => {
    // Kiểm tra tất cả các trường bắt buộc có được điền hay không
    const errors: string[] = [];
    const newFieldErrors: {
      username?: boolean;
      password?: boolean;
      email?: boolean;
      role?: boolean;
    } = {};

    // Kiểm tra tên đăng nhập
    if (!formData.username) {
      errors.push("Tên đăng nhập không được để trống");
      newFieldErrors.username = true;
    } else if (formData.username.length < 3) {
      errors.push("Tên đăng nhập phải có ít nhất 3 ký tự");
      newFieldErrors.username = true;
    } else if (!/^[a-zA-Z0-9_.-]+$/.test(formData.username)) {
      errors.push(
        "Tên đăng nhập chỉ được chứa chữ cái không dấu, số và các ký tự _ . -"
      );
      newFieldErrors.username = true;
    } else if (usernameExists) {
      // Kiểm tra nếu tên đăng nhập đã tồn tại (từ kiểm tra real-time)
      errors.push(
        "Tên đăng nhập đã tồn tại. Vui lòng chọn tên đăng nhập khác."
      );
      newFieldErrors.username = true;
    }

    // Kiểm tra mật khẩu (chỉ khi tạo mới người dùng)
    if (!initialData) {
      if (!formData.password) {
        errors.push("Mật khẩu không được để trống");
        newFieldErrors.password = true;
      } else if (formData.password.length < 6) {
        errors.push("Mật khẩu phải có ít nhất 6 ký tự");
        newFieldErrors.password = true;
      }
    }

    // Kiểm tra email
    if (!formData.email) {
      errors.push("Email không được để trống");
      newFieldErrors.email = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.push("Email không đúng định dạng");
      newFieldErrors.email = true;
    } else if (emailExists) {
      // Kiểm tra nếu email đã tồn tại (từ kiểm tra real-time)
      errors.push("Email đã tồn tại. Vui lòng sử dụng email khác.");
      newFieldErrors.email = true;
    }

    // Kiểm tra vai trò
    if (!formData.role) {
      errors.push("Vui lòng chọn vai trò");
      newFieldErrors.role = true;
    }

    // Cập nhật trạng thái lỗi của các trường
    setFieldErrors(newFieldErrors);

    // Nếu có lỗi, hiển thị thông báo và cập nhật trạng thái form
    if (errors.length > 0) {
      // Hiển thị toast cho lỗi đầu tiên
      toast.error(errors[0]);

      // Cập nhật trạng thái lỗi của form
      setFormState("error");
      setFormError(errors.join(", "));

      return false;
    }

    // Nếu không có lỗi, reset trạng thái lỗi
    setFormError(null);
    setFieldErrors({});
    return true;
  };

  const handleSubmit = async () => {
    // Kiểm tra form trước khi submit
    if (!validateForm()) {
      // Nếu form không hợp lệ, dừng lại
      return;
    }

    // Nếu form hợp lệ, tiếp tục xử lý
    setIsSubmitting(true);
    setFormState("submitting");
    setFormError(null);

    try {
      if (initialData) {
        // Update existing user
        const updateData: UserUpdateRequest = { ...formData };

        // Only include password if it was changed
        if (!updateData.password) {
          delete updateData.password;
        }

        // If this is the current admin account, preserve the original is_active status
        if (isCurrentAdmin) {
          // Keep the original is_active value from initialData
          updateData.is_active = initialData.is_active !== false;
          console.log(
            `Preserving original is_active status for current admin: ${updateData.is_active}`
          );
        } else {
          // For other accounts, use the form value
          updateData.is_active = formData.is_active !== false;
          console.log(
            `Setting is_active to ${updateData.is_active} (from ${formData.is_active})`
          );
        }

        console.log(`Updating user ${initialData.id} with data:`, updateData);
        const response = await usersApi.update(initialData.id, updateData);
        console.log("Update response:", response);

        if (response.success) {
          setFormState("success");
          toast.success("Cập nhật người dùng thành công");

          // Close dialog after a short delay
          setTimeout(() => {
            onOpenChange(false);
            onSubmitSuccess();
          }, 1000);
        } else {
          console.error("Update failed:", response);
          setFormState("error");

          // Lấy thông báo lỗi từ response và xử lý lỗi tên đăng nhập/email đã tồn tại
          let errorMessage =
            response.message || "Không thể cập nhật người dùng";
          errorMessage = handleUsernameExistsError(errorMessage);
          errorMessage = handleEmailExistsError(errorMessage);

          setFormError(errorMessage);
          toast.error(errorMessage);
        }
      } else {
        // Create new user
        const createData = { ...formData } as UserCreateRequest;

        // Ensure is_active is explicitly set as a boolean
        // According to API spec, is_active is a boolean with default true
        createData.is_active = formData.is_active !== false;
        console.log(
          `Setting is_active to ${createData.is_active} (from ${formData.is_active})`
        );

        console.log("Creating new user with data:", createData);
        const response = await usersApi.create(createData);
        console.log("Create response:", response);

        if (response.success) {
          setFormState("success");
          toast.success("Tạo người dùng thành công");

          // Close dialog after a short delay
          setTimeout(() => {
            onOpenChange(false);
            onSubmitSuccess();
          }, 1000);
        } else {
          console.error("Create failed:", response);
          setFormState("error");

          // Lấy thông báo lỗi từ response và xử lý lỗi tên đăng nhập/email đã tồn tại
          let errorMessage = response.message || "Không thể tạo người dùng mới";
          errorMessage = handleUsernameExistsError(errorMessage);
          errorMessage = handleEmailExistsError(errorMessage);

          setFormError(errorMessage);
          toast.error(errorMessage);
        }
      }
    } catch (error) {
      console.error("Error submitting user form:", error);
      setFormState("error");

      // Extract error message from response if available
      let errorMessage = "Có lỗi xảy ra. Vui lòng thử lại sau.";

      if (error && typeof error === "object") {
        // Use a more specific type for the error
        interface ErrorWithResponse {
          response?: {
            data?: {
              message?: string;
            };
          };
          message?: string;
        }

        const err = error as ErrorWithResponse;
        if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err.message) {
          errorMessage = err.message;
        }
      }

      // Xử lý lỗi tên đăng nhập và email đã tồn tại
      errorMessage = handleUsernameExistsError(errorMessage);
      errorMessage = handleEmailExistsError(errorMessage);

      setFormError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Hàm tiện ích để xử lý lỗi tên đăng nhập đã tồn tại
  const handleUsernameExistsError = (errorMessage: string): string => {
    // Kiểm tra nếu lỗi liên quan đến tên đăng nhập đã tồn tại
    const usernameExistsError =
      errorMessage.toLowerCase().includes("username") &&
      (errorMessage.toLowerCase().includes("already exists") ||
        errorMessage.toLowerCase().includes("already taken") ||
        errorMessage.toLowerCase().includes("đã tồn tại") ||
        errorMessage.toLowerCase().includes("đã được sử dụng"));

    if (usernameExistsError) {
      // Đánh dấu trường tên đăng nhập là lỗi
      setFieldErrors((prev) => ({
        ...prev,
        username: true,
      }));

      // Cập nhật thông báo lỗi để rõ ràng hơn
      return "Tên đăng nhập đã tồn tại. Vui lòng chọn tên đăng nhập khác.";
    }

    return errorMessage;
  };

  // Hàm tiện ích để xử lý lỗi email đã tồn tại
  const handleEmailExistsError = (errorMessage: string): string => {
    // Kiểm tra nếu lỗi liên quan đến email đã tồn tại
    const emailExistsError =
      errorMessage.toLowerCase().includes("email") &&
      (errorMessage.toLowerCase().includes("already exists") ||
        errorMessage.toLowerCase().includes("already taken") ||
        errorMessage.toLowerCase().includes("đã tồn tại") ||
        errorMessage.toLowerCase().includes("đã được sử dụng"));

    if (emailExistsError) {
      // Đánh dấu trường email là lỗi
      setFieldErrors((prev) => ({
        ...prev,
        email: true,
      }));

      // Cập nhật thông báo lỗi để rõ ràng hơn
      return "Email đã tồn tại. Vui lòng sử dụng email khác.";
    }

    return errorMessage;
  };

  // Handle dialog close with state reset
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset state when closing
      setTimeout(() => {
        setFormState("idle");
        setFormError(null);
        setFieldErrors({}); // Reset field errors
      }, 300);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[550px] border-orange-100 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent flex items-center">
            {initialData ? (
              <>
                <UserCog className="h-5 w-5 mr-2 text-orange-500" />
                Chỉnh sửa Người dùng
              </>
            ) : (
              <>
                <UserPlus className="h-5 w-5 mr-2 text-orange-500" />
                Thêm Người dùng Mới
              </>
            )}
          </DialogTitle>
          <p className="text-muted-foreground mt-1.5">
            {initialData
              ? "Cập nhật thông tin và quyền truy cập của người dùng"
              : "Tạo tài khoản người dùng mới với quyền truy cập phù hợp"}
          </p>
        </DialogHeader>

        {/* Error message display */}
        {formError && formState === "error" && (
          <Alert
            variant="destructive"
            className="mt-2 mb-4 bg-red-50 border-red-200"
          >
            <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
            <AlertDescription>
              {formError.includes(", ") ? (
                <div className="space-y-1">
                  <p className="font-medium">Vui lòng sửa các lỗi sau:</p>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {formError.split(", ").map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                formError
              )}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-5 py-5">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="username"
              className="text-right font-medium text-gray-700"
            >
              Tên đăng nhập <span className="text-red-500">*</span>
            </Label>
            <div className="col-span-3 space-y-1">
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => handleChange("username", e.target.value)}
                className={`w-full ${
                  fieldErrors.username
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                }`}
                placeholder="Nhập tên đăng nhập (không dấu, chỉ chứa a-z, 0-9, _, ., -)"
                aria-invalid={fieldErrors.username}
              />
              {isCheckingUsername ? (
                <p className="text-xs text-blue-500 font-medium flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-3 w-3 text-blue-500"
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
                  Đang kiểm tra tên đăng nhập...
                </p>
              ) : fieldErrors.username ? (
                <p className="text-xs text-red-500 font-medium">
                  {usernameExists
                    ? "Tên đăng nhập đã tồn tại. Vui lòng chọn tên đăng nhập khác."
                    : formError &&
                      formError.includes("Tên đăng nhập đã tồn tại")
                    ? "Tên đăng nhập đã tồn tại. Vui lòng chọn tên đăng nhập khác."
                    : "Tên đăng nhập không hợp lệ. Vui lòng kiểm tra lại."}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Tên đăng nhập phải có ít nhất 3 ký tự và chỉ chứa chữ cái
                  không dấu, số và các ký tự _ . -
                </p>
              )}
            </div>
          </div>

          {!initialData && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="password"
                className="text-right font-medium text-gray-700"
              >
                Mật khẩu <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className={`col-span-3 ${
                  fieldErrors.password
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                }`}
                placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                aria-invalid={fieldErrors.password}
              />
            </div>
          )}

          {initialData && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="newPassword"
                className="text-right font-medium text-gray-700"
              >
                Mật khẩu mới
              </Label>
              <div className="col-span-3">
                <Input
                  id="newPassword"
                  type="password"
                  value={formData.password || ""}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="w-full border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                  placeholder="Để trống nếu không thay đổi"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Để trống nếu không muốn thay đổi mật khẩu hiện tại
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="email"
              className="text-right font-medium text-gray-700"
            >
              Email <span className="text-red-500">*</span>
            </Label>
            <div className="col-span-3 space-y-1">
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`w-full ${
                  fieldErrors.email
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                }`}
                placeholder="Nhập địa chỉ email"
                aria-invalid={fieldErrors.email}
              />
              {isCheckingEmail ? (
                <p className="text-xs text-blue-500 font-medium flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-3 w-3 text-blue-500"
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
                  Đang kiểm tra email...
                </p>
              ) : fieldErrors.email ? (
                <p className="text-xs text-red-500 font-medium">
                  {emailExists
                    ? "Email đã tồn tại. Vui lòng sử dụng email khác."
                    : formError && formError.includes("Email đã tồn tại")
                    ? "Email đã tồn tại. Vui lòng sử dụng email khác."
                    : "Email không hợp lệ. Vui lòng kiểm tra lại."}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="role"
              className="text-right font-medium text-gray-700"
            >
              Vai trò <span className="text-red-500">*</span>
            </Label>
            <div className="col-span-3">
              <Select
                value={formData.role}
                onValueChange={(value) => handleChange("role", value)}
              >
                <SelectTrigger
                  className={`w-full ${
                    fieldErrors.role
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                  }`}
                  aria-invalid={fieldErrors.role}
                >
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin" className="flex items-center">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-red-500" />
                      <span>Quản trị viên</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="staff" className="flex items-center">
                    <div className="flex items-center">
                      <UserCog className="w-4 h-4 mr-2 text-blue-500" />
                      <span>Nhân viên</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                {formData.role === "admin"
                  ? "Quản trị viên có toàn quyền quản lý hệ thống, bao gồm quản lý người dùng"
                  : "Nhân viên có quyền quản lý nội dung nhưng không thể quản lý người dùng"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="is_active"
              className="text-right font-medium text-gray-700"
            >
              Trạng thái
            </Label>
            <div className="flex flex-col col-span-3">
              <div className="flex items-center space-x-3">
                <Switch
                  id="is_active"
                  checked={formData.is_active === true}
                  onCheckedChange={(checked: boolean) => {
                    console.log(`Switch changed to: ${checked}`);
                    handleChange("is_active", checked);
                  }}
                  disabled={isCurrentAdmin}
                  className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300"
                />
                <Label
                  htmlFor="is_active"
                  className={`font-medium ${
                    isCurrentAdmin
                      ? "cursor-not-allowed opacity-70"
                      : "cursor-pointer"
                  }`}
                >
                  {formData.is_active === true ? (
                    <span className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1.5" />
                      Hoạt động
                    </span>
                  ) : (
                    <span className="flex items-center text-gray-600">
                      <XCircle className="w-4 h-4 mr-1.5" />
                      Vô hiệu hóa
                    </span>
                  )}
                </Label>
              </div>
              {isCurrentAdmin && (
                <div className="mt-2 text-xs text-amber-600 flex items-center">
                  <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
                  Không thể thay đổi trạng thái của tài khoản admin đang đăng
                  nhập
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className="border-gray-300 hover:bg-gray-100 transition-colors"
          >
            Hủy bỏ
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 shadow-sm hover:shadow transition-all font-medium"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Đang xử lý...
              </>
            ) : initialData ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Cập nhật
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4 mr-2" />
                Tạo mới
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserForm;

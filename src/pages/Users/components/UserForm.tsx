import React, { useState, useEffect } from "react";
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
    }
  };

  const validateForm = () => {
    if (!formData.username || formData.username.length < 3) {
      toast.error("Tên đăng nhập phải có ít nhất 3 ký tự");
      return false;
    }

    if (!initialData && (!formData.password || formData.password.length < 6)) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Email không hợp lệ");
      return false;
    }

    if (!formData.role) {
      toast.error("Vui lòng chọn vai trò");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
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
          toast.success("Cập nhật người dùng thành công");
          onOpenChange(false);
          onSubmitSuccess();
        } else {
          console.error("Update failed:", response);
          toast.error(response.message || "Không thể cập nhật người dùng");
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
          toast.success("Tạo người dùng thành công");
          onOpenChange(false);
          onSubmitSuccess();
        } else {
          console.error("Create failed:", response);
          toast.error(response.message || "Không thể tạo người dùng mới");
        }
      }
    } catch (error) {
      console.error("Error submitting user form:", error);

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

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] border-orange-100 dark:border-orange-900/30 shadow-lg">
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

        <div className="grid gap-5 py-5">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="username"
              className="text-right font-medium text-gray-700 dark:text-gray-300"
            >
              Tên đăng nhập <span className="text-red-500">*</span>
            </Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
              className="col-span-3 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
              placeholder="Nhập tên đăng nhập"
            />
          </div>

          {!initialData && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="password"
                className="text-right font-medium text-gray-700 dark:text-gray-300"
              >
                Mật khẩu <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className="col-span-3 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
              />
            </div>
          )}

          {initialData && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="newPassword"
                className="text-right font-medium text-gray-700 dark:text-gray-300"
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
              className="text-right font-medium text-gray-700 dark:text-gray-300"
            >
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="col-span-3 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
              placeholder="Nhập địa chỉ email"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="role"
              className="text-right font-medium text-gray-700 dark:text-gray-300"
            >
              Vai trò <span className="text-red-500">*</span>
            </Label>
            <div className="col-span-3">
              <Select
                value={formData.role}
                onValueChange={(value) => handleChange("role", value)}
              >
                <SelectTrigger className="w-full border-orange-200 focus:border-orange-400 focus:ring-orange-400">
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
              className="text-right font-medium text-gray-700 dark:text-gray-300"
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
                    <span className="flex items-center text-green-600 dark:text-green-500">
                      <CheckCircle className="w-4 h-4 mr-1.5" />
                      Hoạt động
                    </span>
                  ) : (
                    <span className="flex items-center text-gray-600 dark:text-gray-400">
                      <XCircle className="w-4 h-4 mr-1.5" />
                      Vô hiệu hóa
                    </span>
                  )}
                </Label>
              </div>
              {isCurrentAdmin && (
                <div className="mt-2 text-xs text-amber-600 dark:text-amber-500 flex items-center">
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
            className="border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
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

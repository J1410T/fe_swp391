import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { usersApi } from "@/api/resources/users";
import { User } from "@/api/resources/auth";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UserForm } from "./components/UserForm";
import { DeleteUserDialog } from "./components/DeleteUserDialog";
import { SuccessDialog } from "@/components/SuccessDialog";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  UserCog,
  Shield,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

/**
 * Users management page component
 * Allows role assignment and management of internal staff accounts
 */
export function Users(): React.ReactElement {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Dialog states
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState(false);

  // Success dialog state
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [successDialogData, setSuccessDialogData] = useState({
    title: "",
    message: "",
  });

  // Fetch users on component mount and when needed
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null); // Xóa thông báo thành công khi làm mới danh sách

    try {
      const response = await usersApi.getAll();
      if (response.success) {
        setUsers(response.data);

        // Hiển thị thông báo thành công khi làm mới danh sách
        toast.success(`Đã tải ${response.data.length} người dùng thành công`, {
          position: "top-center",
          icon: <RefreshCw className="h-5 w-5 text-green-500" />,
        });
      } else {
        const errorMessage =
          response.message || "Không thể tải danh sách người dùng";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Error fetching users:", error);

      // Extract error message from response if available
      let errorMessage = "Có lỗi xảy ra khi tải danh sách người dùng";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error && typeof error === "object") {
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

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditUserDialogOpen(true);
  };

  // Xử lý sau khi thêm hoặc cập nhật người dùng thành công
  const handleUserFormSuccess = (
    action: "create" | "update",
    username: string
  ) => {
    // Hiển thị thông báo thành công
    const message =
      action === "create"
        ? `Người dùng ${username} đã được tạo thành công`
        : `Người dùng ${username} đã được cập nhật thành công`;

    setSuccessMessage(message);

    // Tự động ẩn thông báo sau 5 giây
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);

    // Làm mới danh sách người dùng
    fetchUsers();
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteUserDialogOpen(true);
  };

  // Xử lý sau khi xóa người dùng thành công
  const handleDeleteSuccess = (deletedUser: User) => {
    // Xóa thông báo lỗi nếu có
    setError(null);

    // Hiển thị thông báo thành công trong trang
    setSuccessMessage(
      `Người dùng ${deletedUser.username} đã được xóa thành công`
    );

    // Hiển thị toast thông báo thành công
    toast.success(`Đã xóa người dùng ${deletedUser.username} thành công`, {
      position: "top-center",
      duration: 3000,
      icon: <Trash2 className="h-5 w-5 text-green-500" />,
    });

    // Hiển thị popup thông báo thành công
    setSuccessDialogData({
      title: "Xóa người dùng thành công!",
      message: `Người dùng ${deletedUser.username} đã được xóa thành công khỏi hệ thống.`,
    });
    setIsSuccessDialogOpen(true);

    // Tự động ẩn thông báo sau 5 giây
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);

    // Làm mới danh sách người dùng
    fetchUsers();
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-red-300">
            <Shield className="w-3 h-3 mr-1" />
            Quản trị viên
          </Badge>
        );
      case "staff":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-300">
            <UserCog className="w-3 h-3 mr-1" />
            Nhân viên
          </Badge>
        );
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8 max-w-7xl">
      {/* Header Section with improved styling */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-6 shadow-sm border border-orange-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
              Quản lý Người dùng
            </h1>
            <p className="text-muted-foreground">
              Quản lý tài khoản người dùng hệ thống và phân quyền truy cập
            </p>
          </div>
          <Button
            onClick={() => setIsAddUserDialogOpen(true)}
            className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 shadow-md hover:shadow-lg transition-all duration-200 font-medium"
            size="lg"
          >
            <Plus className="mr-2 h-5 w-5" /> Thêm người dùng
          </Button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80 transition-all duration-200 focus-within:w-full sm:focus-within:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm theo tên, email hoặc vai trò..."
              className="pl-10 pr-4 py-2 border-orange-200 focus:border-orange-400 focus:ring-orange-400 transition-all"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <Button
            variant="outline"
            onClick={fetchUsers}
            disabled={isLoading}
            className="border-orange-200 hover:border-orange-400 hover:bg-orange-50 transition-all duration-200"
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${
                isLoading ? "animate-spin text-orange-500" : ""
              }`}
            />
            Làm mới danh sách
          </Button>
        </div>

        {/* Success message display */}
        {successMessage && (
          <Alert className="mt-4 bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
            <AlertDescription className="text-green-700">
              {successMessage}
            </AlertDescription>
          </Alert>
        )}

        {/* Error message display */}
        {error && (
          <Alert
            variant="destructive"
            className="mt-4 bg-red-50 border-red-200"
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>

      {/* Table Section with improved styling */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow className="hover:bg-gray-50">
                <TableHead className="font-semibold text-gray-700">
                  Tên đăng nhập
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Email
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Vai trò
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Trạng thái
                </TableHead>
                <TableHead className="text-right font-semibold text-gray-700">
                  Thao tác
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-16">
                    <div className="flex flex-col items-center justify-center">
                      <RefreshCw className="animate-spin h-8 w-8 text-orange-500 mb-3" />
                      <p className="text-muted-foreground font-medium">
                        Đang tải dữ liệu người dùng...
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-16">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="h-8 w-8 text-muted-foreground mb-3" />
                      <p className="text-muted-foreground font-medium">
                        {searchTerm
                          ? "Không tìm thấy người dùng phù hợp với từ khóa tìm kiếm"
                          : "Chưa có người dùng nào trong hệ thống"}
                      </p>
                      {searchTerm && (
                        <Button
                          variant="link"
                          onClick={() => setSearchTerm("")}
                          className="mt-2 text-orange-500 hover:text-orange-600"
                        >
                          Xóa bộ lọc tìm kiếm
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className="hover:bg-orange-50 transition-colors duration-150"
                  >
                    <TableCell className="font-medium">
                      {user.username}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {user.email}
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>
                      {user.is_active !== false ? (
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 border-green-300 px-3 py-1 font-medium"
                        >
                          <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                          Hoạt động
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-gray-100 text-gray-800 border-gray-300 px-3 py-1 font-medium"
                        >
                          <XCircle className="w-3.5 h-3.5 mr-1.5" />
                          Vô hiệu hóa
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(user)}
                          title="Chỉnh sửa"
                          className="hover:bg-orange-100 text-gray-700 hover:text-orange-600 transition-colors"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Sửa
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(user)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                          title="Xóa"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Xóa
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Table footer with pagination or summary */}
        {!isLoading && filteredUsers.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 text-sm text-gray-500">
            Hiển thị {filteredUsers.length} người dùng{" "}
            {searchTerm ? "phù hợp với tìm kiếm" : ""}
          </div>
        )}
      </div>

      {/* User Form Dialog */}
      <UserForm
        isOpen={isAddUserDialogOpen}
        onOpenChange={setIsAddUserDialogOpen}
        onSubmitSuccess={handleUserFormSuccess}
      />

      {/* Edit User Dialog */}
      <UserForm
        isOpen={isEditUserDialogOpen}
        onOpenChange={setIsEditUserDialogOpen}
        initialData={selectedUser}
        onSubmitSuccess={handleUserFormSuccess}
      />

      {/* Delete User Dialog */}
      <DeleteUserDialog
        isOpen={isDeleteUserDialogOpen}
        onOpenChange={setIsDeleteUserDialogOpen}
        user={selectedUser}
        onDeleteSuccess={handleDeleteSuccess}
      />

      {/* Success Dialog */}
      <SuccessDialog
        isOpen={isSuccessDialogOpen}
        onClose={() => setIsSuccessDialogOpen(false)}
        title={successDialogData.title}
        message={successDialogData.message}
        autoCloseDelay={4000}
      />
    </div>
  );
}

export default Users;

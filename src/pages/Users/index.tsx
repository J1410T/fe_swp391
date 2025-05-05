import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { usersApi } from "@/api/resources/users";
import { User } from "@/api/resources/auth";
import { Button } from "@/components/ui/button";
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

  // Dialog states
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState(false);

  // Fetch users on component mount and when needed
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await usersApi.getAll();
      if (response.success) {
        setUsers(response.data);
      } else {
        toast.error("Không thể tải danh sách người dùng");
      }
    } catch (error) {
      console.error("Error fetching users:", error);

      // Extract error message from response if available
      let errorMessage = "Có lỗi xảy ra khi tải danh sách người dùng";

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

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteUserDialogOpen(true);
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
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 rounded-lg p-6 shadow-sm border border-orange-100 dark:border-orange-900/30">
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
      <div className="bg-white dark:bg-gray-950 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-800">
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
            className="border-orange-200 hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-all duration-200"
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${
                isLoading ? "animate-spin text-orange-500" : ""
              }`}
            />
            Làm mới danh sách
          </Button>
        </div>
      </div>

      {/* Table Section with improved styling */}
      <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-gray-900">
              <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-900">
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                  Tên đăng nhập
                </TableHead>
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                  Email
                </TableHead>
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                  Vai trò
                </TableHead>
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                  Trạng thái
                </TableHead>
                <TableHead className="text-right font-semibold text-gray-700 dark:text-gray-300">
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
                    className="hover:bg-orange-50 dark:hover:bg-orange-950/10 transition-colors duration-150"
                  >
                    <TableCell className="font-medium">
                      {user.username}
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
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
                          className="hover:bg-orange-100 dark:hover:bg-orange-950/30 text-gray-700 dark:text-gray-300 hover:text-orange-600 transition-colors"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Sửa
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(user)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
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
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-sm text-gray-500 dark:text-gray-400">
            Hiển thị {filteredUsers.length} người dùng{" "}
            {searchTerm ? "phù hợp với tìm kiếm" : ""}
          </div>
        )}
      </div>

      {/* User Form Dialog */}
      <UserForm
        isOpen={isAddUserDialogOpen}
        onOpenChange={setIsAddUserDialogOpen}
        onSubmitSuccess={fetchUsers}
      />

      {/* Edit User Dialog */}
      <UserForm
        isOpen={isEditUserDialogOpen}
        onOpenChange={setIsEditUserDialogOpen}
        initialData={selectedUser}
        onSubmitSuccess={fetchUsers}
      />

      {/* Delete User Dialog */}
      <DeleteUserDialog
        isOpen={isDeleteUserDialogOpen}
        onOpenChange={setIsDeleteUserDialogOpen}
        user={selectedUser}
        onDeleteSuccess={fetchUsers}
      />
    </div>
  );
}

export default Users;

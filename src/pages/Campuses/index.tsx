import { Suspense, useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { Loading } from "@/components/common/loading";
import { ErrorBoundary } from "@/components/common/error-boundary";
import type { CampusesLoaderResponse } from "@/types/loaders/campus";
import { campusesApi, type CampusResponse } from "@/api/resources/campuses";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
// import { AddCampus } from "./AddCampus";
import { dormitoriesApi } from "@/api/resources/dormitories";
import type { DormitoryResponse } from "@/types/entities/dormitory";
import {
  Building2,
  Edit,
  MapPin,
  MoreHorizontal,
  Trash,
  Users,
} from "lucide-react";
import { DialogContent, Dialog } from "@/components/ui/dialog";
import { CampusForm, DeleteDialog } from "./CampusForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Component nội dung của trang Campuses
 */
function CampusesContent(): React.ReactElement {
  // Lấy dữ liệu từ loader
  useLoaderData<CampusesLoaderResponse>();

  const [campuses, setCampuses] = useState<CampusResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDormitory, setSelectedDormitory] =
    useState<DormitoryResponse | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState<CampusResponse | null>(
    null
  );
  const [isAddCampusDialogOpen, setIsAddCampusDialogOpen] = useState(false);
  const [isEditCampusDialogOpen, setIsEditCampusDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [campusToDelete, setCampusToDelete] = useState<CampusResponse | null>(
    null
  );

  const fetchCampuses = async () => {
    try {
      setIsLoading(true);
      const response = await campusesApi.getAll();
      if (response.data) {
        setCampuses(response.data);
      }
    } catch (err) {
      setError("Không thể tải dữ liệu cơ sở đào tạo");
      console.error("Error fetching campuses:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCampuses();
  }, []);

  const handleViewDormitoryDetails = async (dormitoryId: number) => {
    try {
      const response = await dormitoriesApi.getById(dormitoryId);
      if (response.data) {
        setSelectedDormitory(response.data);
        setIsDetailDialogOpen(true);
      }
    } catch (error) {
      console.error("Lỗi tải chi tiết ký túc xá:", error);
    }
  };

  const handleDeleteCampus = async () => {
    if (campusToDelete) {
      try {
        await campusesApi.delete(campusToDelete.id);
        fetchCampuses();
        setIsDeleteDialogOpen(false);
        setCampusToDelete(null);
      } catch (error) {
        console.error("Error deleting campus:", error);
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cơ sở Đào tạo</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý thông tin các cơ sở Đại học FPT trên toàn quốc
          </p>
        </div>
        <Button
          onClick={() => setIsAddCampusDialogOpen(true)}
          className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600"
        >
          Thêm cơ sở mới
        </Button>
        <CampusForm
          isOpen={isAddCampusDialogOpen}
          onOpenChange={setIsAddCampusDialogOpen}
          onSubmitSuccess={fetchCampuses}
        />
      </div>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campuses.map((campus) => (
          <Card
            key={campus.id}
            className="overflow-hidden hover:shadow-xl transition-shadow rounded-lg border border-gray-300 bg-white"
          >
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4 bg-gradient-to-r from-indigo-50 to-indigo-100 p-4">
              <div className="space-y-1">
                <CardTitle className="text-xl font-bold text-gray-900">
                  {campus.name}
                </CardTitle>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white shadow-md rounded-md">
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSelectedCampus(campus);
                      setIsEditCampusDialogOpen(true);
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4 text-gray-600" />
                    Chỉnh sửa
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer text-red-600 hover:bg-red-50"
                    onClick={() => {
                      setCampusToDelete(campus);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    <Trash className="mr-2 h-4 w-4 text-red-600" />
                    Xóa
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CampusForm
              isOpen={isEditCampusDialogOpen}
              onOpenChange={setIsEditCampusDialogOpen}
              initialData={selectedCampus}
              onSubmitSuccess={fetchCampuses}
            />

            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Địa chỉ:
                  </span>
                  <p className="mt-1 text-gray-700">{campus.address}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Số điện thoại:
                  </span>
                  <p className="mt-1 text-gray-700">
                    {campus.contact.phone || "Chưa cập nhật"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Email:
                  </span>
                  <p className="mt-1 text-gray-700">
                    {campus.contact.email || "Chưa cập nhật"}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center border-t pt-4 bg-gray-50 p-4">
              <Button
                className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600"
                onClick={() => handleViewDormitoryDetails(campus.id)}
              >
                Xem Ký túc xá
              </Button>
            </CardFooter>

            <Dialog
              open={isDetailDialogOpen}
              onOpenChange={setIsDetailDialogOpen}
            >
              <DialogContent className="fixed z-50 max-w-lg bg-white rounded-xl shadow-2xl border-none">
                {selectedDormitory && (
                  <div className="p-6 space-y-4">
                    <div className="flex items-center space-x-4 border-b pb-4">
                      <div className="bg-orange-100 p-3 rounded-full">
                        <Building2 className="w-8 h-8 text-orange-500" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {selectedDormitory.name}
                      </h3>
                    </div>

                    <p className="text-gray-600 italic">
                      {selectedDormitory.description ||
                        "Không có mô tả chi tiết"}
                    </p>

                    <div className="grid  gap-4 bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5 text-orange-500" />
                        <div>
                          <strong className="text-sm text-gray-600">
                            Địa chỉ
                          </strong>
                          <p className="text-gray-800">
                            {selectedDormitory.campus.address ||
                              "Chưa cập nhật"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-orange-500" />
                        <div>
                          <strong className="text-sm text-gray-600">
                            Sức chứa
                          </strong>
                          <p className="text-gray-800">
                            {selectedDormitory.capacity || "Chưa xác định"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>

            <DeleteDialog
              isOpen={isDeleteDialogOpen}
              onClose={() => setIsDeleteDialogOpen(false)}
              onConfirm={handleDeleteCampus}
              campusName={campusToDelete?.name}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}

/**
 * Trang quản lý cơ sở đào tạo
 */
export function Campuses(): React.ReactElement {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-4 border border-red-300 rounded-md text-red-500">
          Đã xảy ra lỗi khi tải dữ liệu cơ sở đào tạo
        </div>
      }
    >
      <Suspense fallback={<Loading />}>
        <CampusesContent />
      </Suspense>
    </ErrorBoundary>
  );
}

export default Campuses;

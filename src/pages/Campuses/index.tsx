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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { AddCampus } from "./AddCampus";
import { dormitoriesApi } from "@/api/resources/dormitories";
import type { DormitoryResponse } from "@/types/entities/dormitory";
import { Building2, MapPin, Users } from "lucide-react";
import { DialogContent, Dialog } from "@/components/ui/dialog";

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
  const [isAddCampusDialogOpen, setIsAddCampusDialogOpen] = useState(false);

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
        <AddCampus
          isOpen={isAddCampusDialogOpen}
          onOpenChange={setIsAddCampusDialogOpen}
          onCampusAdded={fetchCampuses}
        />
      </div>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campuses.map((campus) => (
          <Card
            key={campus.id}
            className="overflow-hidden hover:shadow-md transition-shadow"
          >
            <CardHeader className="bg-gradient-to-r ">
              <CardTitle className="text-xl font-semibold">
                {campus.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Địa chỉ:
                  </span>
                  <p className="mt-1">{campus.address}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4 bg-gray-50">
              <Button
                variant="outline"
                className="text-gray-700 border-gray-300 hover:bg-gray-100"
                onClick={() => handleViewDormitoryDetails(campus.id)}
              >
                Xem Ký túc xá
              </Button>
              <Button className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600">
                Chỉnh sửa
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

                    {/* <DialogFooter className="flex justify-end space-x-2 pt-4 border-t">
                      <Button
                        variant="outline"
                        className="text-gray-600 hover:bg-gray-100"
                      >
                        Đóng
                      </Button>
                      <Button className="bg-gradient-to-r from-orange-400 to-amber-500 text-white hover:from-orange-500 hover:to-amber-600">
                        Chi tiết
                      </Button>
                    </DialogFooter> */}
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </Card>
        ))}
      </div>

      <Separator className="my-8" />

      <div>
        <h2 className="text-xl font-semibold mb-4">Danh sách cơ sở đào tạo</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-orange-50">
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead className="w-[300px]">Tên cơ sở</TableHead>
                <TableHead>Địa chỉ</TableHead>
                <TableHead className="w-[150px] text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campuses.map((campus) => (
                <TableRow key={campus.id}>
                  <TableCell className="font-medium">{campus.id}</TableCell>
                  <TableCell className="font-medium">{campus.name}</TableCell>
                  <TableCell>{campus.address}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="h-8">
                        Xem
                      </Button>
                      <Button
                        size="sm"
                        className="h-8 bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600"
                      >
                        Sửa
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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

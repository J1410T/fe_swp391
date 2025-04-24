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

/**
 * Component nội dung của trang Campuses
 */
function CampusesContent(): React.ReactElement {
  // Lấy dữ liệu từ loader
  useLoaderData<CampusesLoaderResponse>();
  
  const [campuses, setCampuses] = useState<CampusResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    fetchCampuses();
  }, []);

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
        <Button className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600">
          Thêm cơ sở mới
        </Button>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campuses.map((campus) => (
          <Card key={campus.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
              <CardTitle className="text-xl font-semibold">{campus.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">Địa chỉ:</span>
                  <p className="mt-1">{campus.address}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4 bg-gray-50">
              <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-100">
                Xem Ký túc xá
              </Button>
              <Button className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600">
                Chỉnh sửa
              </Button>
            </CardFooter>
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

import { Suspense, useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { Loading } from "@/components/common/loading";
import { ErrorBoundary } from "@/components/common/error-boundary";
import type { DormitoriesLoaderResponse } from "@/types/loaders/dormitory";
import { dormitoriesApi, type DormitoryResponse } from "@/api/resources/dormitories";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
 * Component nội dung của trang Dormitories
 * Allows updating information on rooms, prices, and conditions
 */
function DormitoriesContent(): React.ReactElement {
  // Lấy dữ liệu từ loader
  useLoaderData<DormitoriesLoaderResponse>();
  
  const [dormitories, setDormitories] = useState<DormitoryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDormitories = async () => {
      try {
        setIsLoading(true);
        const response = await dormitoriesApi.getAll();
        if (response.data) {
          setDormitories(response.data);
        }
      } catch (err) {
        setError("Không thể tải dữ liệu ký túc xá");
        console.error("Error fetching dormitories:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDormitories();
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
          <h1 className="text-3xl font-bold tracking-tight">Ký túc xá</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý thông tin các ký túc xá của trường Đại học FPT
          </p>
        </div>
        <Button className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600">
          Thêm ký túc xá mới
        </Button>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dormitories.map((dormitory) => (
          <Card key={dormitory.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
              <CardTitle className="text-lg font-semibold">{dormitory.name}</CardTitle>
              <CardDescription>{dormitory.campus.name}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">Mô tả:</span>
                  <p className="mt-1">{dormitory.description}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Sức chứa:</span>
                  <Badge variant="outline" className="border-orange-400 text-orange-700">
                    {dormitory.capacity} sinh viên
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4 bg-gray-50">
              <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-100">
                Chi tiết
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
        <h2 className="text-xl font-semibold mb-4">Bảng tổng hợp ký túc xá</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-orange-50">
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Tên ký túc xá</TableHead>
                <TableHead>Cơ sở</TableHead>
                <TableHead>Sức chứa</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dormitories.map((dormitory) => (
                <TableRow key={dormitory.id}>
                  <TableCell className="font-medium">{dormitory.id}</TableCell>
                  <TableCell>{dormitory.name}</TableCell>
                  <TableCell>{dormitory.campus.name}</TableCell>
                  <TableCell>{dormitory.capacity}</TableCell>
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
 * Dormitories page with error boundary and suspense
 */
export function Dormitories(): React.ReactElement {
  return (
    <ErrorBoundary fallback={<div className="p-4 text-red-500">Có lỗi xảy ra khi tải trang</div>}>
      <Suspense fallback={<Loading />}>
        <DormitoriesContent />
      </Suspense>
    </ErrorBoundary>
  );
}

export default Dormitories;

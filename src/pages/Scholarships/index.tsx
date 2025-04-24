import { Suspense, useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { Loading } from "@/components/common/loading";
import { ErrorBoundary } from "@/components/common/error-boundary";
import type { ScholarshipsLoaderResponse } from "@/types/loaders/scholarship";
import { scholarshipsApi, type ScholarshipResponse } from "@/api/resources/scholarships";
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
 * Component nội dung của trang Scholarships
 * Allows attaching scholarships by major, campus, and academic year
 */
function ScholarshipsContent(): React.ReactElement {
  // Lấy dữ liệu từ loader
  useLoaderData<ScholarshipsLoaderResponse>();
  
  const [scholarships, setScholarships] = useState<ScholarshipResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        setIsLoading(true);
        const response = await scholarshipsApi.getAll();
        if (response.data) {
          setScholarships(response.data);
        }
      } catch (err) {
        setError("Không thể tải dữ liệu học bổng");
        console.error("Error fetching scholarships:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  // Hàm định dạng tiền tệ
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Học bổng</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý thông tin học bổng dành cho sinh viên Đại học FPT
          </p>
        </div>
        <Button className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600">
          Thêm học bổng mới
        </Button>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scholarships.map((scholarship) => (
          <Card key={scholarship.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
              <CardTitle className="text-lg font-semibold">{scholarship.name}</CardTitle>
              <CardDescription>
                {scholarship.campus ? scholarship.campus.name : "Tất cả cơ sở"} • 
                {scholarship.major ? scholarship.major.name : "Tất cả ngành học"}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">Mô tả:</span>
                  <p className="mt-1">{scholarship.description}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Điều kiện:</span>
                  <p className="mt-1">{scholarship.condition}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Giá trị:</span>
                  <Badge variant="outline" className="border-orange-400 text-orange-700 font-semibold">
                    {formatCurrency(scholarship.amount)}
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4 bg-gray-50">
              <Button 
                variant="outline" 
                className="text-gray-700 border-gray-300 hover:bg-gray-100"
                onClick={() => window.open(scholarship.application_url, '_blank')}
              >
                Link đăng ký
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
        <h2 className="text-xl font-semibold mb-4">Danh sách học bổng</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-orange-50">
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead className="w-[200px]">Tên học bổng</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead className="w-[150px]">Giá trị</TableHead>
                <TableHead className="w-[150px]">Ngành học</TableHead>
                <TableHead className="w-[130px]">Cơ sở</TableHead>
                <TableHead className="w-[100px] text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scholarships.map((scholarship) => (
                <TableRow key={scholarship.id}>
                  <TableCell className="font-medium">{scholarship.id}</TableCell>
                  <TableCell className="font-medium">{scholarship.name}</TableCell>
                  <TableCell className="truncate max-w-[250px]">{scholarship.description}</TableCell>
                  <TableCell className="font-semibold text-orange-700">
                    {formatCurrency(scholarship.amount)}
                  </TableCell>
                  <TableCell>{scholarship.major?.name || "Tất cả ngành"}</TableCell>
                  <TableCell>{scholarship.campus?.name || "Tất cả cơ sở"}</TableCell>
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
 * Scholarships page with error boundary and suspense
 */
export function Scholarships(): React.ReactElement {
  return (
    <ErrorBoundary fallback={<div className="p-4 text-red-500">Có lỗi xảy ra khi tải dữ liệu học bổng</div>}>
      <Suspense fallback={<Loading />}>
        <ScholarshipsContent />
      </Suspense>
    </ErrorBoundary>
  );
}

export default Scholarships;

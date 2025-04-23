import { useState, useEffect, Suspense } from "react";
import { admissionMethodsApi } from "@/api/resources/admission-methods";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Loading } from "@/components/common/loading";
import { ErrorBoundary } from "@/components/common/error-boundary";
import { toast } from "sonner";
import { AddAdmissionMethod } from "./AddAdmissionMethod";
import type { AdmissionMethod } from "@/types";

/**
 * Component nội dung của trang AdmissionMethods
 */
function AdmissionMethodsContent(): React.ReactElement {
  const [admissionMethods, setAdmissionMethods] = useState<AdmissionMethod[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAdmissionMethods = async () => {
    try {
      setLoading(true);
      const response = await admissionMethodsApi.getAll();
      setAdmissionMethods(response.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Lỗi không xác định'));
      toast.error("Không thể tải dữ liệu phương thức tuyển sinh");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissionMethods();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="p-4 border border-red-300 rounded-md text-red-500">
        <p>Lỗi khi tải dữ liệu: {error.message}</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Phương thức tuyển sinh</h1>
          <p className="text-muted-foreground">Quản lý các phương thức tuyển sinh của trường</p>
        </div>
        <AddAdmissionMethod onSuccess={fetchAdmissionMethods} />
      </div>
      
      <Separator />
      
      <Tabs defaultValue="table" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="table">Bảng</TabsTrigger>
          <TabsTrigger value="cards">Thẻ</TabsTrigger>
        </TabsList>
        
        <TabsContent value="table" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách phương thức tuyển sinh</CardTitle>
              <CardDescription>Tất cả các phương thức tuyển sinh hiện có trong hệ thống</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Danh sách phương thức tuyển sinh</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Tên phương thức</TableHead>
                    <TableHead>Mô tả</TableHead>
                    <TableHead>URL đăng ký</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {admissionMethods.map((method) => (
                    <TableRow key={method.id}>
                      <TableCell className="font-medium">{method.id}</TableCell>
                      <TableCell>{method.name}</TableCell>
                      <TableCell>{method.description}</TableCell>
                      <TableCell>
                        <a 
                          href={method.application_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {method.application_url}
                        </a>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Chi tiết
                          </Button>
                          <Button variant="outline" size="sm">
                            Sửa
                          </Button>
                          <Button variant="destructive" size="sm">
                            Xóa
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cards" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {admissionMethods.map((method) => (
              <Card key={method.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle>{method.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{method.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="text-muted-foreground text-sm">ID:</span>
                      <Badge variant="outline" className="ml-2">{method.id}</Badge>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm">URL đăng ký:</span>
                      <a 
                        href={method.application_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-2 text-blue-500 hover:underline text-sm"
                      >
                        {method.application_url}
                      </a>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-3 border-t">
                  <Button variant="outline" size="sm">
                    Chi tiết
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Sửa
                    </Button>
                    <Button variant="destructive" size="sm">
                      Xóa
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

/**
 * Trang quản lý phương thức tuyển sinh
 */
export function AdmissionMethods(): React.ReactElement {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-4 border border-red-300 rounded-md text-red-500">
          Đã xảy ra lỗi khi tải dữ liệu phương thức tuyển sinh
        </div>
      }
    >
      <Suspense fallback={<Loading />}>
        <AdmissionMethodsContent />
      </Suspense>
    </ErrorBoundary>
  );
}

export default AdmissionMethods;

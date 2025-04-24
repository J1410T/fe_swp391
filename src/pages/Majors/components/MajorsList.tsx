import { Major } from "@/types/entities/major";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { MajorItem } from "./MajorItem";
import { PaginationParams } from "@/types";

interface MajorsListProps {
  majors: Major[];
  totalItems: number;
  pagination: PaginationParams;
  searchQuery: string;
  onPageChange: (page: number) => void;
  onView: (major: Major) => void;
  onEdit: (major: Major) => void;
  onDelete: (major: Major) => void;
  onAddNew: () => void;
}

/**
 * Component hiển thị danh sách ngành học
 */
export function MajorsList({ 
  majors, 
  totalItems, 
  pagination, 
  searchQuery,
  onPageChange, 
  onView, 
  onEdit, 
  onDelete,
  onAddNew
}: MajorsListProps) {
  // Số ngành học hiển thị trên mỗi trang
  const itemsPerPage = pagination.limit;
  // Tổng số trang
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  // Kiểm tra dữ liệu trống
  if (!majors || majors.length === 0) {
    return (
      <Card className="text-center py-16 bg-white border-orange-100 shadow-sm rounded-lg">
        <CardContent>
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-orange-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500 mb-2 text-lg">Không tìm thấy ngành học nào</p>
            {searchQuery && (
              <p className="text-gray-500 text-sm">
                Thử tìm kiếm với từ khóa khác hoặc&nbsp;
                <Button 
                  onClick={() => {
                    // Gọi API tìm kiếm với tham số trống để reset
                    onPageChange(1);
                  }} 
                  variant="link"
                  className="text-orange-500 p-0 h-auto hover:underline"
                >
                  xóa bộ lọc
                </Button>
              </p>
            )}
            {!searchQuery && (
              <Button 
                onClick={onAddNew} 
                className="mt-4 bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm ngành học mới
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-gray-500">Hiển thị {majors.length} ngành học</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {majors.map((major: Major) => (
          <MajorItem 
            key={major.id} 
            major={major} 
            onView={onView} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 py-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
            className="border-gray-300 text-gray-700"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm text-gray-600">
            Trang {pagination.page} / {totalPages}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page >= totalPages}
            className="border-gray-300 text-gray-700"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  );
}

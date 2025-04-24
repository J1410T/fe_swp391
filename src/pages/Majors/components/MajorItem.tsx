import { Major } from "@/types/entities/major";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction, 
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

interface MajorItemProps {
  major: Major;
  onView: (major: Major) => void;
  onEdit: (major: Major) => void;
  onDelete: (major: Major) => void;
}

/**
 * Component hiển thị thông tin ngành học
 */
export function MajorItem({ major, onView, onEdit, onDelete }: MajorItemProps) {
  return (
    <Card className="hover:shadow-md transition-shadow w-full bg-white overflow-hidden border-orange-100 h-full flex flex-col">
      <CardHeader className="pb-2 relative">
        <div className="absolute top-0 right-0 bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700 rounded-bl-md max-w-[120px] truncate text-center">
          {major.code}
        </div>
        <div className="flex justify-between items-start pt-4">
          <div className="w-full pr-16"> {/* Thêm padding-right để tránh chồng lên mã ngành */}
            <CardTitle className="text-lg font-semibold text-gray-800 line-clamp-1">{major.name}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-gray-700 line-clamp-3 text-sm mb-3">
          {major.description || "Chưa có mô tả"}
        </p>
      </CardContent>
      <div className="px-6 pb-2">
        {major.careers && major.careers.length > 0 && (
          <div className="flex flex-col space-y-1">
            <h4 className="text-xs font-medium text-gray-500 mb-1">Cơ hội nghề nghiệp:</h4>
            <div className="flex flex-wrap gap-1.5 justify-start items-center">
              {major.careers && major.careers.slice(0, 3).map((career) => (
                <Badge 
                  key={career.id} 
                  variant="outline" 
                  className="border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100 text-xs py-1 px-2 max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap inline-block"
                  title={career.name}
                >
                  {career.name}
                </Badge>
              ))}
              {major.careers && major.careers.length > 3 && (
                <Badge 
                  variant="outline" 
                  className="border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100 text-xs py-1 px-2"
                  title={`${major.careers.length - 3} ngành nghề khác`}
                >
                  +{major.careers.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
      <CardFooter className="pt-0 pb-3 flex justify-end gap-2 border-t border-gray-100 mt-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              onClick={() => onView(major)} 
              variant="ghost" 
              size="sm" 
              className="text-orange-600 hover:bg-orange-50 hover:text-orange-700 h-8 px-3"
            >
              <Eye className="h-4 w-4 mr-1" />
              <span className="text-xs">Xem</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Xem chi tiết</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              onClick={() => onEdit(major)} 
              variant="ghost" 
              size="sm"
              className="text-amber-600 hover:bg-amber-50 hover:text-amber-700 h-8 px-3"
            >
              <Pencil className="h-4 w-4 mr-1" />
              <span className="text-xs">Sửa</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Chỉnh sửa thông tin</p>
          </TooltipContent>
        </Tooltip>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-red-600 hover:bg-red-50 hover:text-red-700 h-8 px-3"
            >
              <Trash className="h-4 w-4 mr-1" />
              <span className="text-xs">Xóa</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Xác nhận xóa ngành học?</AlertDialogTitle>
              <AlertDialogDescription>
                Bạn có chắc muốn xóa ngành <span className="font-medium text-orange-500">{major.name}</span>? Hành động này không thể khôi phục.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-white hover:bg-gray-100 text-gray-700 border-gray-300">Hủy</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(major)} className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600">Xác nhận</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}

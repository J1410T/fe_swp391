import { AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Component hiển thị trạng thái đang tải
 */
export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="h-12 w-12 text-purple-500 animate-spin mb-4" />
      <p className="text-gray-500">Đang tải dữ liệu học bổng...</p>
    </div>
  );
}

/**
 * Component hiển thị trạng thái lỗi
 */
export function ErrorState({ error, onRetry }: { error: Error; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
      <h3 className="text-lg font-medium text-red-800 mb-2">Không thể tải dữ liệu</h3>
      <p className="text-gray-500 mb-4">{error.message}</p>
      <Button variant="outline" onClick={onRetry}>
        Thử lại
      </Button>
    </div>
  );
}

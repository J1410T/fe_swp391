import { Suspense } from "react";
import { useLoaderData } from "react-router-dom";
import { Loading } from "@/components/common/loading";
import { ErrorBoundary } from "@/components/common/error-boundary";
import type { MajorsLoaderResponse } from "@/types/loaders/major";

/**
 * Component nội dung của trang Majors
 */
function MajorsContent(): React.ReactElement {
  // Lấy dữ liệu từ loader
  useLoaderData<MajorsLoaderResponse>();
  
  return (
    <div>
      <h1>Ngành học</h1>
      {/* TODO: Implement UI for majors management */}
    </div>
  );
}

/**
 * Trang quản lý ngành học
 */
export default function Majors() {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-4 border border-red-300 rounded-md text-red-500">
          Đã xảy ra lỗi khi tải dữ liệu ngành học
        </div>
      }
    >
      <Suspense fallback={<Loading />}>
        <MajorsContent />
      </Suspense>
    </ErrorBoundary>
  );
}

import { Suspense } from "react";
import { useLoaderData } from "react-router-dom";
import { Loading } from "@/components/common/loading";
import { ErrorBoundary } from "@/components/common/error-boundary";
import type { AdmissionMethodsLoaderResponse } from "@/types/loaders/admission-method";

/**
 * Component nội dung của trang AdmissionMethods
 */
function AdmissionMethodsContent(): React.ReactElement {
  // Lấy dữ liệu từ loader
  useLoaderData<AdmissionMethodsLoaderResponse>();
  
  return (
    <div>
      <h1>Phương thức tuyển sinh</h1>
      {/* TODO: Implement UI for admission methods management */}
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

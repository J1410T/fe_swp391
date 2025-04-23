import { Suspense } from "react";
import { useLoaderData } from "react-router-dom";
import { Loading } from "@/components/common/loading";
import { ErrorBoundary } from "@/components/common/error-boundary";
import type { DormitoriesLoaderResponse } from "@/types/loaders/dormitory";

/**
 * Component nội dung của trang Dormitories
 * Allows updating information on rooms, prices, and conditions
 */
function DormitoriesContent(): React.ReactElement {
  // Lấy dữ liệu từ loader
  useLoaderData<DormitoriesLoaderResponse>();
  
  return (
    <div>
      <h1>Ký túc xá</h1>
      {/* TODO: Implement UI for dormitories management */}
    </div>
  );
}

/**
 * Dormitories page with error boundary and suspense
 */
export function Dormitories(): React.ReactElement {
  return (
    <ErrorBoundary fallback={<div>Có lỗi xảy ra</div>}>
      <Suspense fallback={<Loading />}>
        <DormitoriesContent />
      </Suspense>
    </ErrorBoundary>
  );
}

export default Dormitories;

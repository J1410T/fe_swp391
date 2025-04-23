import { Suspense } from "react";
import { useLoaderData } from "react-router-dom";
import { Loading } from "@/components/common/loading";
import { ErrorBoundary } from "@/components/common/error-boundary";
import type { ScholarshipsLoaderResponse } from "@/types/loaders/scholarship";

/**
 * Component nội dung của trang Scholarships
 * Allows attaching scholarships by major, campus, and academic year
 */
function ScholarshipsContent(): React.ReactElement {
  // Lấy dữ liệu từ loader
  useLoaderData<ScholarshipsLoaderResponse>();
  
  return (
    <div>
      <h1>Học bổng</h1>
      {/* TODO: Implement UI for scholarships management */}
    </div>
  );
}

/**
 * Scholarships page with error boundary and suspense
 */
export function Scholarships(): React.ReactElement {
  return (
    <ErrorBoundary fallback={<div>Có lỗi xảy ra</div>}>
      <Suspense fallback={<Loading />}>
        <ScholarshipsContent />
      </Suspense>
    </ErrorBoundary>
  );
}

export default Scholarships;

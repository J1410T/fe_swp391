/**
 * Trang quản lý ngành học
 * 
 * Các thay đổi chính:
 * 1. Sửa lỗi xử lý dữ liệu từ API - đảm bảo dữ liệu được hiển thị đúng trong UI
 * 2. Cải thiện giao diện người dùng sử dụng ShadCN UI Components
 * 3. Tối ưu hiển thị thông tin ngành học và cơ hội nghề nghiệp
 * 4. Thêm các tính năng UI/UX: responsive, phân trang, hiển thị trạng thái rỗng
 * 5. Sử dụng TailwindCSS để tạo giao diện nhất quán và đẹp mắt
 */

import { Suspense } from "react";
import { ErrorBoundary } from "@/components/common/error-boundary";
import { Loading } from "@/components/common/loading";

// Components
import { MajorSearch } from "./components/MajorSearch";
import { MajorsList } from "./components/MajorsList";
import { ViewMajorSheet } from "./components/ViewMajorSheet";
import { EditMajorSheet } from "./components/EditMajorSheet";

// Hooks
import { useMajors } from "./hooks/useMajors";

/**
 * Component nội dung của trang Majors
 */
function MajorsContent(): React.ReactElement {
  const {
    majorsData,
    pagination,
    searchQuery,
    viewSheetOpen,
    editSheetOpen,
    selectedMajor,
    handleView,
    handleEdit,
    handleDelete,
    handleSearch,
    handleAddNew,
    handlePageChange,
    handleUpdateMajor,
    setViewSheetOpen,
    setEditSheetOpen
  } = useMajors();

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-6 bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Quản lý ngành học</h1>
        <p className="text-gray-600">Quản lý thông tin các ngành đào tạo và cơ hội nghề nghiệp liên quan</p>
        <div className="h-1 w-24 bg-gradient-to-r from-orange-400 to-amber-500 mt-4 rounded-full"></div>
      </div>
      
      {/* Sheet xem chi tiết ngành học */}
      <ViewMajorSheet 
        isOpen={viewSheetOpen}
        onOpenChange={setViewSheetOpen}
        major={selectedMajor}
      />
      
      {/* Sheet chỉnh sửa ngành học */}
      <EditMajorSheet 
        isOpen={editSheetOpen}
        onOpenChange={setEditSheetOpen}
        major={selectedMajor}
        onSave={handleUpdateMajor}
      />

      <MajorSearch onSearch={handleSearch} onAddNew={handleAddNew} />

      <MajorsList 
        majors={majorsData.items} 
        totalItems={majorsData.total}
        pagination={pagination}
        searchQuery={searchQuery}
        onPageChange={handlePageChange}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddNew={handleAddNew}
      />
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
        <div className="p-4 border border-red-300 rounded-md text-red-500 m-4">
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
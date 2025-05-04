/**
 * Trang Cấu hình ngành học
 * 
 * Chức năng:
 * 1. Hiển thị 2 tab: "Quản lý Ngành học" và "Phương thức Tuyển sinh"
 * 2. Tab Ngành học: Hiển thị danh sách ngành học với các thông tin chi tiết
 * 3. Tab Phương thức tuyển sinh: Hiển thị thông tin phương thức tuyển sinh
 * 4. Tối ưu giao diện người dùng với Tailwind CSS và ShadCN UI Components
 * 5. Hỗ trợ xem chi tiết, chỉnh sửa và xóa ngành học
 */

import { Suspense, useState } from "react";
import { ErrorBoundary } from "@/components/common/error-boundary";
import { Loading } from "@/components/common/loading";

// Components
import { MajorSearch } from "./components/MajorSearch";
import { ViewMajorSheet } from "./components/ViewMajorSheet";
import { EditMajorSheet } from "./components/EditMajorSheet";
import { TabNavigation } from "./components/TabNavigation";
import { MajorsCardView } from "./components/MajorsCardView";
import AdmissionMethodsTab from "./components/AdmissionMethodsTab";

// Hooks
import { useMajorsConfig } from "./hooks/useMajorsConfig";
import { Major } from "@/types/entities/major";

/**
 * Component nội dung của trang Cấu hình ngành học
 */
function MajorsConfigContent(): React.ReactElement {
  const {
    majorsData,
    pagination,
    viewSheetOpen,
    editSheetOpen,
    selectedMajor,
    activeTab,
    handleView,
    handleEdit,
    handleDelete,
    handleSearch,
    handleAddNew,
    handlePageChange,
    handleUpdateMajor,
    handleTabChange,
    handleSelectMajor,
    setViewSheetOpen,
    setEditSheetOpen,
    setSelectedMajor
  } = useMajorsConfig();

  // Xử lý xem chi tiết ngành học trên major card
  const handleViewDetail = (major: Major) => {
    // Chỉ cập nhật major được chọn và mở sheet, không lọc danh sách
    setSelectedMajor(major);
    // Mở ViewMajorSheet để hiển thị chi tiết
    setViewSheetOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-6 bg-white p-0 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 p-6">Cấu Hình Ngành Học</h1>

        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
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

      {/* Nội dung tab */}
      {activeTab === "majors" ? (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <MajorSearch 
            onSearch={handleSearch} 
            onAddNew={handleAddNew} 
            onSelectMajor={handleSelectMajor}
          />

          <MajorsCardView
            majors={majorsData.items} 
            totalItems={majorsData.total}
            pagination={pagination}
            onPageChange={handlePageChange}
            onView={handleViewDetail}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      ) : (
        <AdmissionMethodsTab />
      )}

      {/* Dialog chi tiết ngành học */}
            
    </div>
  );
}

/**
 * Trang Cấu hình ngành học
 */
export default function MajorsConfig() {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-4 border border-red-300 rounded-md text-red-500 m-4">
          Đã xảy ra lỗi khi tải dữ liệu cấu hình ngành học
        </div>
      }
    >
      <Suspense fallback={<Loading />}>
        <MajorsConfigContent />
      </Suspense>
    </ErrorBoundary>
  );
}
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

import { Suspense } from "react";
import { ErrorBoundary } from "@/components/common/error-boundary";
import { Loading } from "@/components/common/loading";

// Components
import { MajorSearch } from "./components/MajorSearch";
import { ViewMajorSheet } from "./components/ViewMajorSheet";
import { EditMajorSheet } from "./components/EditMajorSheet";
import { CreateMajorForm } from "./components/CreateMajorForm";
import { DeleteMajorDialog } from "./components/DeleteMajorDialog";
import { TabNavigation } from "./components/TabNavigation";
import { MajorsCardView } from "./components/MajorsCardView";
import { AdmissionMethodsTab } from "./components";

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
    createDialogOpen,
    deleteDialogOpen,
    selectedMajor,
    isLoading,
    activeTab,

    handleEdit,
    handleDelete,
    handleSearch,
    handleAddNew,
    handlePageChange,
    handleUpdateMajor,
    handleTabChange,
    handleSelectMajor,
    handleMajorCreated,
    handleMajorDeleted,
    setViewSheetOpen,
    setEditSheetOpen,
    setCreateDialogOpen,
    setDeleteDialogOpen,
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

      {/* Form tạo ngành học mới */}
      <CreateMajorForm
        isOpen={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onCreated={handleMajorCreated}
      />

      {/* Dialog xóa ngành học */}
      <DeleteMajorDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        major={selectedMajor}
        onDeleted={handleMajorDeleted}
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
            majors={majorsData.items.filter(major => major !== null && major !== undefined && major.id)}
            totalItems={majorsData.total}
            pagination={pagination}
            onPageChange={handlePageChange}
            onView={handleViewDetail}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {isLoading && (
            <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-lg z-10">
              <div className="animate-spin h-8 w-8 border-4 border-orange-400 rounded-full border-t-transparent"></div>
            </div>
          )}
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
import { FormEvent } from "react";
import { motion } from "framer-motion";
import { useScholarships } from "./useScholarships";
import { LoadingState, ErrorState } from "./LoadingErrorStates";
import { ScholarshipHeader } from "./ScholarshipHeader";
import { ScholarshipStats } from "./ScholarshipStats";
import { ScholarshipTable } from "./ScholarshipTable";
import { ScholarshipAddModal } from "./ScholarshipAddModal";
import { ScholarshipEditModal } from "./ScholarshipEditModal";
import { ScholarshipDeleteModal } from "./ScholarshipDeleteModal";
import { containerAnimation, itemAnimation } from "./animations";

// Props cho ScholarshipsTab component
interface ScholarshipsTabProps {
  academicYear: string | number;
  onRefetch: () => Promise<void>;
}

export function ScholarshipsTab({ academicYear, onRefetch }: ScholarshipsTabProps) {
  const {
    filteredScholarships,
    filteredResults,
    isAddModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    selectedScholarship,
    loading,
    fetchLoading,
    error,
    searchTerm,
    year,
    setIsAddModalOpen,
    setIsEditModalOpen,
    setIsDeleteModalOpen,
    setSearchTerm,
    handleEdit,
    handleDelete,
    confirmDelete,
    fetchScholarships,
    addScholarship,
    updateScholarship
  } = useScholarships({ academicYear, onRefetch });

  // Handler cho form thêm học bổng
  const handleAddSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addScholarship(new FormData(e.currentTarget));
  };

  // Handler cho form chỉnh sửa học bổng
  const handleEditSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateScholarship(new FormData(e.currentTarget));
  };

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerAnimation}
    >
      {fetchLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState error={error} onRetry={fetchScholarships} />
      ) : (
        <>
          {/* Header và thanh tìm kiếm */}
          <ScholarshipHeader
            academicYear={academicYear}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onAddClick={() => setIsAddModalOpen(true)}
            itemAnimation={itemAnimation}
          />

          {/* Thống kê nhanh */}
          <ScholarshipStats
            filteredScholarships={filteredScholarships}
            year={year}
            itemAnimation={itemAnimation}
          />

          {/* Bảng học bổng */}
          <ScholarshipTable
            filteredResults={filteredResults}
            year={year}
            searchTerm={searchTerm}
            onSearchClear={() => setSearchTerm("")}
            onEdit={handleEdit}
            onDelete={handleDelete}
            itemAnimation={itemAnimation}
          />
        </>
      )}

      {/* Modal xóa học bổng */}
      <ScholarshipDeleteModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={confirmDelete}
        loading={loading}
      />

      {/* Modal thêm học bổng */}
      <ScholarshipAddModal
        isOpen={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSubmit={handleAddSubmit}
        loading={loading}
        academicYear={academicYear}
      />

      {/* Modal chỉnh sửa học bổng */}
      <ScholarshipEditModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onSubmit={handleEditSubmit}
        loading={loading}
        scholarship={selectedScholarship}
      />
    </motion.div>
  );
}

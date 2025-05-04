import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Plus, GraduationCap, School, Award, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loading } from "@/components/common/loading";
import { ErrorBoundary } from "@/components/common/error-boundary";
import { Card, CardContent } from "@/components/ui/card";

// Custom hooks
import { useAcademicYears } from "./hooks/useAcademicYears";

// Components
import { AcademicYearCard } from "./components/AcademicYearCard";
import { YearContentTabs } from "./components/YearContentTabs";
import { AddAcademicYearModal } from "./components/AddAcademicYearModal";
import { EditAcademicYearModal } from "./components/EditAcademicYearModal";
import { DeleteAcademicYearModal } from "./components/DeleteAcademicYearModal";

/**
 * Component nội dung của trang AdmissionMethods
 */
function AdmissionMethodsContent(): React.ReactElement {
  const {
    academicYears,
    loading,
    error,
    expandedYear,
    fetchAcademicYears,
    addAcademicYear,
    updateAcademicYear,
    deleteAcademicYear,
    toggleYearExpanded,
  } = useAcademicYears();

  // State cho các modal
  const [isAddYearModalOpen, setIsAddYearModalOpen] = useState(false);
  const [isEditYearModalOpen, setIsEditYearModalOpen] = useState(false);
  const [isDeleteYearModalOpen, setIsDeleteYearModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  useEffect(() => {
    fetchAcademicYears();
  }, [fetchAcademicYears]);

  // Handlers cho các thao tác với năm tuyển sinh
  const handleAddYear = async (year: string) => {
    await addAcademicYear(year);
    return fetchAcademicYears();
  };

  const handleEditYear = (year: string) => {
    setSelectedYear(year);
    setIsEditYearModalOpen(true);
  };

  const handleDeleteYear = (year: string) => {
    setSelectedYear(year);
    setIsDeleteYearModalOpen(true);
  };

  const handleUpdateYear = async () => {
    if (selectedYear) {
      await updateAcademicYear(selectedYear);
      return fetchAcademicYears();
    }
    return Promise.resolve();
  };

  const handleConfirmDeleteYear = async () => {
    if (selectedYear) {
      await deleteAcademicYear(selectedYear);
      return fetchAcademicYears();
    }
    return Promise.resolve();
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="p-4 border border-red-300 rounded-md text-red-500">
        <p>Lỗi khi tải dữ liệu: {error.message}</p>
      </div>
    );
  }

  // Hiệu ứng animation
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3
      }
    }
  };

  const itemAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300 } }
  };

  const fadeInUpAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className="container mx-auto py-10 space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerAnimation}
    >
      {/* Header */}
      <motion.div 
        className="flex flex-col md:flex-row md:justify-between md:items-center gap-4"
        variants={fadeInUpAnimation}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-orange-500" />
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-500 to-amber-600 text-transparent bg-clip-text">
              Quản lý tuyển sinh
            </h1>
          </div>
          <p className="text-muted-foreground pl-10">
            Quản lý các năm tuyển sinh, ngành học và học bổng
          </p>
        </div>
        <Button
          variant="default"
          className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white shadow-md hover:shadow-lg transition-all duration-300 md:self-end"
          onClick={() => setIsAddYearModalOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm năm tuyển sinh
        </Button>
      </motion.div>

      <motion.div variants={itemAnimation}>
        <Separator className="bg-gradient-to-r from-orange-200 to-amber-200" />
      </motion.div>

      {/* Thống kê nhanh */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        variants={itemAnimation}
      >
        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-100 hover:shadow-md transition-all duration-300">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <Calendar className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-orange-800">Năm tuyển sinh</p>
              <p className="text-2xl font-bold">{academicYears.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <School className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Tổng ngành học</p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-100 shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Award className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-purple-800">Học bổng</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Danh sách năm tuyển sinh */}
      <motion.div className="space-y-4" variants={itemAnimation}>
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-orange-500" />
          Danh sách năm tuyển sinh
        </h2>
        
        <div className="space-y-4">
          {academicYears.length > 0 ? (
            academicYears.map((year, index) => (
              <motion.div 
                key={year.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <AcademicYearCard
                  year={year.year}
                  expanded={expandedYear === year.year}
                  onToggle={() => toggleYearExpanded(year.year)}
                  onEdit={() => handleEditYear(year.year)}
                  onDelete={() => handleDeleteYear(year.year)}
                >
                  <YearContentTabs
                    academicYear={year.year}
                    onRefetch={fetchAcademicYears}
                  />
                </AcademicYearCard>
              </motion.div>
            ))
          ) : (
            <motion.div 
              className="text-center py-16 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg border border-orange-100 shadow-sm"
              variants={fadeInUpAnimation}
            >
              <Calendar className="h-16 w-16 text-orange-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Chưa có năm tuyển sinh nào
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Bắt đầu quản lý tuyển sinh bằng cách thêm năm tuyển sinh đầu tiên
              </p>
              <Button
                variant="default"
                className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => setIsAddYearModalOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Thêm năm tuyển sinh
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
      {/* Modals */}
      <AddAcademicYearModal
        isOpen={isAddYearModalOpen}
        onClose={() => setIsAddYearModalOpen(false)}
        onSuccess={handleAddYear}
        existingYears={academicYears.map((year) => year.year)}
      />

      {selectedYear && (
        <>
          <EditAcademicYearModal
            isOpen={isEditYearModalOpen}
            onClose={() => setIsEditYearModalOpen(false)}
            onSuccess={handleUpdateYear}
            year={selectedYear}
            description={academicYears.find((y) => y.year === selectedYear)?.description}
          />

          <DeleteAcademicYearModal
            isOpen={isDeleteYearModalOpen}
            onClose={() => setIsDeleteYearModalOpen(false)}
            onSuccess={handleConfirmDeleteYear}
            year={selectedYear}
          />
        </>
      )}
    </motion.div>
  );
}

/**
 * Trang quản lý phương thức tuyển sinh
 */
function AdmissionMethods(): React.ReactElement {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold">Đã xảy ra lỗi</h2>
          <p>Vui lòng thử lại sau</p>
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

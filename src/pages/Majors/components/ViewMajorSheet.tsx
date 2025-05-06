import { Major } from "@/types/entities/major";
import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, GraduationCap, Briefcase, Code, FileText, School, MapPin, Calculator, Building2, Calendar, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { memo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ViewMajorSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  major: Major | null;
}

/**
 * Sheet hiển thị chi tiết ngành học
 */
const ViewMajorSheetComponent = ({ isOpen, onOpenChange, major }: ViewMajorSheetProps) => {
  if (!major) return null;

  // State để quản lý tab đang được chọn
  const [setActiveTab] = useState<string>("admissions");

  // Hàm format tiền tệ với xử lý lỗi
  const formatCurrency = (amount: number): string => {
    try {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(amount);
    } catch (error) {
      console.error('Lỗi khi format số tiền:', error);
      return `${amount.toLocaleString('vi-VN')} VNĐ`;
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                className="fixed left-[50%] top-[50%] z-50 w-[95%] max-w-xl translate-x-[-50%] translate-y-[-50%] rounded-xl border-2 border-orange-400 bg-white overflow-hidden shadow-xl max-h-[85vh] mx-auto flex flex-col"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 300,
                  duration: 0.3
                }}
              >

                <motion.div
                  className="relative bg-gradient-to-r from-orange-400 to-amber-500 p-6 pb-4 rounded-t-xl shadow-md"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <div className="absolute right-4 top-4">
                    <Dialog.Close asChild>
                      <motion.button
                        className="rounded-full h-8 w-8 inline-flex items-center justify-center bg-white/20 hover:bg-white/30 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <X size={16} />
                      </motion.button>
                    </Dialog.Close>
                  </div>

                  <div className="flex items-center justify-center mb-3">
                    <div className="bg-white/20 p-2.5 rounded-full">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  <Dialog.Title className="text-2xl font-bold text-center text-white overflow-hidden text-ellipsis max-w-[90%] mx-auto">
                    Chi tiết ngành học
                  </Dialog.Title>
                  <Dialog.Description className="text-center text-white/90 mt-2 text-sm overflow-hidden text-ellipsis max-w-[90%] mx-auto">
                    Thông tin chi tiết về ngành học
                  </Dialog.Description>
                </motion.div>

                {/* Hiển thị thông tin chi tiết ngành học */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="overflow-y-auto flex-1"
                >
                  <div className="p-6">
                    {/* Thông tin cơ bản */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="mb-6"
                    >
                      <div className="flex items-center mb-4">
                        <div className="bg-orange-100 p-2 rounded-full mr-3" aria-hidden="true">
                          <Code className="h-5 w-5 text-orange-500" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Mã ngành</h3>
                          <p className="text-lg font-semibold text-gray-800">{major.code}</p>
                        </div>
                      </div>

                      <div className="flex items-center mb-4">
                        <div className="bg-orange-100 p-2 rounded-full mr-3" aria-hidden="true">
                          <School className="h-5 w-5 text-orange-500" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Tên ngành</h3>
                          <p className="text-lg font-semibold text-gray-800">{major.name}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap mb-4 gap-2">
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center">
                          <Building2 className="h-3 w-3 mr-1" aria-hidden="true" />
                          {major.majorCampusAdmissions && major.majorCampusAdmissions.length > 0 ?
                            new Set(major.majorCampusAdmissions.map(a => a.campus?.code).filter(Boolean)).size : 0} cơ sở đào tạo
                        </Badge>

                        <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 flex items-center">
                          <Briefcase className="h-3 w-3 mr-1" aria-hidden="true" />
                          {major.careers?.length || 0} cơ hội nghề nghiệp
                        </Badge>
                      </div>

                      {major.description ? (
                        <div className="mb-4 bg-orange-50 p-4 rounded-lg border border-orange-100">
                          <div className="flex items-center mb-2">
                            <div className="bg-orange-100 p-2 rounded-full mr-3" aria-hidden="true">
                              <FileText className="h-5 w-5 text-orange-500" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-700">Mô tả ngành học</h3>
                          </div>
                          <div className="ml-10">
                            <p className="text-gray-700 text-sm leading-relaxed">{major.description}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-4 bg-orange-50 p-4 rounded-lg border border-orange-100">
                          <div className="flex items-center mb-2">
                            <div className="bg-orange-100 p-2 rounded-full mr-3" aria-hidden="true">
                              <FileText className="h-5 w-5 text-orange-500" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-700">Mô tả ngành học</h3>
                          </div>
                          <div className="ml-10">
                            <p className="text-gray-700 text-sm leading-relaxed">
                              Chương trình đào tạo ngành {major.name} cung cấp kiến thức chuyên môn và kỹ năng thực hành để sinh viên có thể trở thành chuyên gia trong lĩnh vực này. Thông qua chương trình, sinh viên sẽ được trang bị các kiến thức nền tảng và tiên tiến, đồng thời phát triển tư duy sáng tạo và khả năng giải quyết vấn đề.
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>

                    {/* Tabs cho thông tin tuyển sinh và cơ hội nghề nghiệp */}
                    <Tabs defaultValue="admissions" className="w-full mt-4" onValueChange={setActiveTab}>
                      <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger
                          value="admissions"
                          className="flex items-center gap-1.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 rounded-lg flex items-center gap-2"
                        >
                          <Building2 className="h-4 w-4" aria-hidden="true" />
                          Thông tin tuyển sinh
                        </TabsTrigger>
                        <TabsTrigger
                          value="careers"
                          className="flex items-center gap-1.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 rounded-lg flex items-center gap-2"
                        >
                          <Briefcase className="h-4 w-4" aria-hidden="true" />
                          Cơ hội nghề nghiệp
                        </TabsTrigger>
                      </TabsList>

                      {/* Tab nội dung thông tin tuyển sinh */}
                      <TabsContent value="admissions" className="mt-0">
                        {major.majorCampusAdmissions && major.majorCampusAdmissions.length > 0 ? (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mb-2"
                          >
                            <div className="space-y-4">
                              {major.majorCampusAdmissions.map((admission, index) => (
                                <div
                                  key={`${admission.campus?.code || 'unknown'}-${index}`}
                                  className="bg-blue-50 rounded-lg p-4 border border-blue-100 hover:border-blue-300 transition-colors"
                                >
                                  <div className="flex items-center mb-2">
                                    <MapPin className="h-4 w-4 text-blue-600 mr-2" aria-hidden="true" />
                                    <h4 className="font-medium text-gray-800">
                                      {admission.campus?.name || 'Chưa có thông tin'}
                                    </h4>
                                    <div className="ml-auto">
                                      <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                                        <Calendar className="h-3 w-3 mr-1" aria-hidden="true" />
                                        {admission.academicYear?.year || 'N/A'}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2 mt-3">
                                    <div className="bg-white p-3 rounded-md border border-blue-200">
                                      <p className="text-sm text-gray-500 mb-1">Học phí</p>
                                      <p className="font-medium text-blue-700">
                                        {formatCurrency(admission.tuition_fee)}
                                      </p>
                                    </div>
                                    <div className="bg-white p-3 rounded-md border border-blue-200">
                                      <p className="text-sm text-gray-500 mb-1">Chỉ tiêu</p>
                                      <p className="font-medium text-blue-700">{admission.quota} sinh viên</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="p-6 text-center bg-blue-50/30 rounded-lg border border-blue-100"
                          >
                            <Building2 className="h-10 w-10 text-blue-300 mx-auto mb-2" aria-hidden="true" />
                            <p className="text-gray-500">Chưa có thông tin tuyển sinh cho ngành học này</p>
                          </motion.div>
                        )}
                      </TabsContent>

                      {/* Tab nội dung cơ hội nghề nghiệp */}
                      <TabsContent value="careers" className="mt-0">
                        {major.careers && major.careers.length > 0 ? (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="space-y-4">
                              {major.careers.map((career) => (
                                <div
                                  key={career.id}
                                  className="bg-green-50 rounded-lg p-4 border border-green-100 hover:border-green-300 transition-colors"
                                >
                                  <div className="flex items-center mb-2">
                                    <div className="bg-green-100 p-1.5 rounded-full mr-2" aria-hidden="true">
                                      <Sparkles className="h-3.5 w-3.5 text-green-600" />
                                    </div>
                                    <h4 className="font-medium text-gray-800">{career.name}</h4>

                                    <div className="ml-auto">
                                      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                                        {career.category}
                                      </Badge>
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-600 ml-7 mb-3">{career.description}</p>

                                  <div className="flex items-center ml-7 bg-white px-3 py-2 rounded-md border border-green-200 w-fit">
                                    <Calculator className="h-3.5 w-3.5 text-green-500 mr-1.5" aria-hidden="true" />
                                    <p className="text-xs text-gray-600">
                                      Mức lương: <span className="font-medium text-green-700">
                                        {career.salary_range ?
                                          (career.salary_range.includes('-') ?
                                            career.salary_range.replace("-", " - ") :
                                            career.salary_range
                                          ) + " VNĐ" :
                                          "Chưa có thông tin"
                                        }
                                      </span>
                                    </p>
                                  </div>

                                  {career.info_url && (
                                    <div className="mt-3 ml-7">
                                      <a
                                        href={career.info_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-green-600 hover:text-green-700 hover:underline flex items-center"
                                        aria-label={`Xem thêm thông tin về ${career.name}`}
                                      >
                                        <FileText className="h-3 w-3 mr-1" aria-hidden="true" />
                                        Xem thêm thông tin
                                      </a>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="p-6 text-center bg-green-50/30 rounded-lg border border-green-100"
                          >
                            <Briefcase className="h-10 w-10 text-green-300 mx-auto mb-2" aria-hidden="true" />
                            <p className="text-gray-500">Chưa có thông tin về cơ hội nghề nghiệp cho ngành học này</p>
                          </motion.div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </div>
                </motion.div>

                <motion.div
                  className="p-6 bg-gradient-to-r from-gray-50 to-orange-50 border-t border-gray-200/70"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex justify-end">
                    <Dialog.Close asChild>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="outline"
                          className="bg-white hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 text-gray-700 border-gray-300 font-medium transition-colors shadow-sm"
                          aria-label="Đóng chi tiết ngành học"
                        >
                          <X className="mr-2 h-4 w-4" aria-hidden="true" />
                          Đóng
                        </Button>
                      </motion.div>
                    </Dialog.Close>
                  </div>
                </motion.div>

              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

// Sử dụng memo để tối ưu hiệu suất, chỉ render lại khi props thay đổi
export const ViewMajorSheet = memo(ViewMajorSheetComponent);

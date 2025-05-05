import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, X, AlertCircle, Sparkles, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { majorsApi } from "@/api/resources/majors";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MajorSearchProps {
  onSearch: (params: { code?: string; name?: string }) => void;
  onAddNew: () => void;
  onSelectMajor?: (major: any) => void;
}

/**
 * Component tìm kiếm và lọc ngành học
 */
export function MajorSearch({ onSearch, onAddNew, onSelectMajor }: MajorSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setSearchError(null); // Reset lỗi khi bắt đầu tìm kiếm mới
    
    try {
      if (searchQuery.trim()) {
        // Kiểm tra xem searchQuery có phải là số không (có thể là mã ngành)
        const majorId = parseInt(searchQuery);
        if (!isNaN(majorId)) {
          try {
            // Nếu là số, thử tìm kiếm theo ID
            const response = await majorsApi.getById(majorId);
            if (response.success && response.data) {
              // Nếu tìm thấy ngành học theo ID
              // Luôn gọi onSearch để hiển thị kết quả trên UI
              onSearch({ code: searchQuery });
              toast.success(`Đã tìm thấy ngành học: ${response.data.name}`);
              return;
            }
          } catch (error: any) {
            console.error("Không tìm thấy ngành học theo ID, chuyển sang tìm kiếm thông thường");
            // Hiển thị thông báo lỗi cụ thể
            toast.error(`Không tìm thấy ngành học với mã ${searchQuery}`);
          }
        }
        
        // Nếu không phải ID hoặc không tìm thấy theo ID, thử tìm kiếm theo tên
        onSearch({ name: searchQuery.trim() });
      } else {
        // Nếu không có giá trị tìm kiếm, hiển thị tất cả ngành học
        onSearch({});
      }
    } catch (error: any) {
      console.error("Lỗi khi tìm kiếm ngành học:", error);
      
      // Xử lý lỗi 400 - Validation error
      if (error.message && error.message.includes('400')) {
        const errorMessage = `Tìm kiếm không hợp lệ: "${searchQuery}". Hãy thử tìm kiếm với từ khóa khác.`;
        setSearchError(errorMessage);
        toast.error(errorMessage);
      } else {
        toast.error("Có lỗi xảy ra khi tìm kiếm ngành học");
      }
      
      onSearch({}); // Hiển thị tất cả khi có lỗi
    } finally {
      setIsSearching(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    // Khi xóa tìm kiếm, gọi onSearch mà không có tham số nào
    onSearch({}); // Hiển thị tất cả ngành học
  };

  // Animation variants - Đã được tối ưu hóa để hoạt động nhất quán
  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      className="bg-white p-5 rounded-xl shadow-md border border-orange-100 mb-8 transition-all duration-300 hover:shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.1), 0 8px 10px -6px rgba(249, 115, 22, 0.1)" }}
    >
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <motion.div 
          className="flex items-center mb-4 lg:mb-0 w-full lg:w-auto"
          variants={itemVariants}
        >
          <div className="bg-gradient-to-r from-orange-400 to-amber-500 p-2 rounded-lg mr-3 shadow-sm">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800 flex items-center flex-wrap">
              <span className="whitespace-nowrap mr-2">Tìm kiếm ngành học</span>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.2, type: "spring", stiffness: 300, damping: 20 }}
              >
                <Badge className="ml-2 bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors">
                  <Sparkles className="h-3 w-3 mr-1 text-amber-500" />
                  FPT AI Admission
                </Badge>
              </motion.div>
            </h2>
            <p className="text-sm text-gray-500 whitespace-nowrap">Nhập mã hoặc tên ngành học để tìm kiếm</p>
          </div>
        </motion.div>
        <motion.div 
          className="w-full lg:w-3/4"
          variants={itemVariants}
        >
          <AnimatePresence>
            {searchError && (
              <motion.div
                key="error-alert"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant="destructive" className="mb-4 border-red-300 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <AlertDescription className="text-red-600 font-medium">{searchError}</AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
          <form onSubmit={handleSearch} className="w-full">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <motion.div 
                  className="relative group"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.2, type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none group-hover:text-orange-500 transition-colors duration-200" />
                  </motion.div>
                  <Input
                    className="pl-10 pr-10 py-2.5 border-gray-200 focus-visible:ring-orange-200 focus-visible:border-orange-300 rounded-lg shadow-sm transition-all duration-200 hover:border-orange-200 w-full bg-orange-50/30"
                    placeholder="Tìm kiếm theo mã hoặc tên ngành học..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <AnimatePresence>
                    {searchQuery && (
                      <motion.div
                        key="clear-button"
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.15, stiffness: 300, damping: 20 }}
                      >
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 flex items-center justify-center text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-colors duration-200"
                          onClick={handleClearSearch}
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
              
              <div className="md:flex-shrink-0">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    type="submit" 
                    size="sm"
                    disabled={isSearching}
                    className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 font-medium w-full md:w-auto"
                  >
                    {isSearching ? (
                      <>
                        <div className="h-3.5 w-3.5 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Đang tìm...
                      </>
                    ) : (
                      <>
                        <Search className="h-3.5 w-3.5 mr-2" />
                        Tìm kiếm
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>
            </div>
          </form>
        </motion.div>
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={onAddNew} 
                  className="w-full top-5 lg:w-auto bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 font-medium flex items-center justify-center whitespace-nowrap"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm ngành học mới
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-orange-100 text-orange-800 border-orange-200">
                <p>Tạo ngành học mới</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>
      </div>
    </motion.div>
  );
}

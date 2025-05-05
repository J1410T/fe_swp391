import React from "react";
import { Input } from "@/components/ui/input";
import { Search, X, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AdmissionMethodsSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  resultsCount: number;
}

export const AdmissionMethodsSearch: React.FC<AdmissionMethodsSearchProps> = ({
  searchTerm,
  onSearchChange,
  resultsCount
}) => {
  return (
    <motion.div
      className="mb-8 flex flex-wrap items-center gap-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="relative flex-grow max-w-md">
        <motion.div
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          animate={{ rotate: searchTerm ? 360 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <Search className="h-4 w-4" />
        </motion.div>

        <Input
          placeholder="Tìm kiếm phương thức tuyển sinh..."
          className="pl-10 pr-10 border-gray-300 focus-visible:ring-orange-500 shadow-sm hover:shadow transition-shadow duration-200"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <AnimatePresence>
          {searchTerm && (
            <motion.button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => onSearchChange("")}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-4 w-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div
          className="flex items-center px-3 py-1.5 bg-orange-50 rounded-full text-sm text-orange-600 font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Filter className="h-3.5 w-3.5 mr-1.5" />
          <span>{resultsCount} phương thức</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

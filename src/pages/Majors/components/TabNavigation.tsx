import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, School } from "lucide-react";

interface TabNavigationProps {
  activeTab: "majors" | "admissionMethods";
  onTabChange: (tab: "majors" | "admissionMethods") => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <motion.div 
      className="border-b border-gray-200 flex mb-6 overflow-hidden"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex w-full">
        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          className="relative"
        >
          <button
            onClick={() => onTabChange("majors")}
            className={`py-4 px-6 font-medium text-center transition-all flex items-center justify-center gap-2 ${
              activeTab === "majors"
                ? "text-orange-600"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <GraduationCap className={`h-4 w-4 ${activeTab === "majors" ? "text-orange-500" : "text-gray-400"}`} />
            Quản lý Ngành học
          </button>
          {activeTab === "majors" && (
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 to-amber-500"
              layoutId="activeTab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.div>
        
        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          className="relative"
        >
          <button
            onClick={() => onTabChange("admissionMethods")}
            className={`py-4 px-6 font-medium text-center transition-all flex items-center justify-center gap-2 ${
              activeTab === "admissionMethods"
                ? "text-orange-600"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <School className={`h-4 w-4 ${activeTab === "admissionMethods" ? "text-orange-500" : "text-gray-400"}`} />
            Phương thức Tuyển sinh
          </button>
          {activeTab === "admissionMethods" && (
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 to-amber-500"
              layoutId="activeTab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

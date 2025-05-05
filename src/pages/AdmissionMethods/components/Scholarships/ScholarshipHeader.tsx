import { Award, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ScholarshipHeaderProps {
  academicYear: string | number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
  itemAnimation: any;
}

export function ScholarshipHeader({
  academicYear,
  searchTerm,
  onSearchChange,
  onAddClick,
  itemAnimation
}: ScholarshipHeaderProps) {
  return (
    <motion.div variants={itemAnimation} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-purple-500" />
          <h3 className="text-lg font-medium">Danh sách học bổng</h3>
        </div>
        <p className="text-sm text-gray-500 pl-7">Năm học {academicYear}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Tìm kiếm học bổng..."
            className="pl-9 w-full sm:w-[250px] border-gray-200 focus:border-purple-300 focus:ring-purple-300"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button
          variant="default"
          size="sm"
          className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white shadow-sm hover:shadow-md transition-all duration-300"
          onClick={onAddClick}
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm học bổng
        </Button>
      </div>
    </motion.div>
  );
}

import { Award, DollarSign, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ScholarshipResponse } from "@/types/entities/scholarship";

interface ScholarshipStatsProps {
  filteredScholarships: ScholarshipResponse[];
  year: number;
  itemAnimation: any;
}

export function ScholarshipStats({
  filteredScholarships,
  year,
  itemAnimation
}: ScholarshipStatsProps) {
  return (
    <motion.div variants={itemAnimation} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Tổng học bổng */}
      <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-100 shadow-sm hover:shadow-md transition-all duration-300">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-full">
            <Award className="h-5 w-5 text-purple-500" />
          </div>
          <div>
            <p className="text-xs font-medium text-purple-800">Tổng học bổng</p>
            <p className="text-xl font-bold">{filteredScholarships.length}</p>
          </div>
        </CardContent>
      </Card>

      {/* Giá trị cao nhất */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100 shadow-sm hover:shadow-md transition-all duration-300">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-full">
            <DollarSign className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <p className="text-xs font-medium text-green-800">Giá trị cao nhất</p>
            <p className="text-xl font-bold">
              {filteredScholarships.length > 0 ?
                new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                  maximumFractionDigits: 0
                }).format(Math.max(...filteredScholarships.map(s => s.amount)))
              : "0 đ"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Phạm vi áp dụng */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-full">
            <MapPin className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-xs font-medium text-blue-800">Phạm vi áp dụng</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {Array.from(new Set(filteredScholarships.flatMap(s =>
                s.availabilities
                  .filter(a => a.academicYear.year === year && a.campus)
                  .map(a => a.campus?.code)
              ).filter(Boolean))).map(campusCode => (
                <Badge key={campusCode} className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">
                  {campusCode}
                </Badge>
              ))}
              {filteredScholarships.some(s =>
                s.availabilities.some(a => a.academicYear.year === year && !a.campus)
              ) && (
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">
                  Tất cả cơ sở
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

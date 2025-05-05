import React from "react";
import { motion } from "framer-motion";
import { MapPin, BookOpen, Award, Calendar } from "lucide-react";
import { AdmissionMethodApplication } from "@/types/entities/admission-method";

interface AdmissionMethodApplicationItemProps {
  application: AdmissionMethodApplication;
  index?: number;
  getCampusName: (code?: string) => string;
  getMajorName: (code?: string) => string;
}

export const AdmissionMethodApplicationItem: React.FC<AdmissionMethodApplicationItemProps> = ({
  application,
  getCampusName,
  getMajorName
}) => {
  return (
    <motion.li
      className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100 hover:border-orange-200 transition-colors duration-200"
      whileHover={{
        backgroundColor: "rgba(255, 237, 213, 0.5)",
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center">
          <MapPin className="h-3 w-3 text-orange-500 mr-1.5" />
          <span className="text-gray-500">Cơ sở:</span>
        </div>
        <span className="font-medium text-gray-800">{getCampusName(application.campus?.code)}</span>
      </div>

      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center">
          <BookOpen className="h-3 w-3 text-orange-500 mr-1.5" />
          <span className="text-gray-500">Ngành:</span>
        </div>
        <span className="font-medium text-gray-800">{getMajorName(application.major?.code)}</span>
      </div>

      {application.min_score && (
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center">
            <Award className="h-3 w-3 text-orange-500 mr-1.5" />
            <span className="text-gray-500">Điểm tối thiểu:</span>
          </div>
          <motion.span
            className="font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full"
            whileHover={{ scale: 1.1 }}
          >
            {application.min_score}
          </motion.span>
        </div>
      )}

      {application.academicYear?.year && (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 text-orange-500 mr-1.5" />
            <span className="text-gray-500">Năm học:</span>
          </div>
          <span className="font-medium text-gray-800">{application.academicYear.year}</span>
        </div>
      )}
    </motion.li>
  );
};

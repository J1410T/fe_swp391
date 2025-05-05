import React from "react";
import { AdmissionMethodApplication } from "@/types/entities/admission-method";

interface AdmissionMethodApplicationItemProps {
  application: AdmissionMethodApplication;
  index: number;
  getCampusName: (code?: string) => string;
  getMajorName: (code?: string) => string;
}

export const AdmissionMethodApplicationItem: React.FC<AdmissionMethodApplicationItemProps> = ({
  application,
  index,
  getCampusName,
  getMajorName
}) => {
  return (
    <li key={index} className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
      <div className="flex justify-between">
        <span>Cơ sở:</span>
        <span className="font-medium">{getCampusName(application.campus?.code)}</span>
      </div>
      <div className="flex justify-between mt-1">
        <span>Ngành:</span>
        <span className="font-medium">{getMajorName(application.major?.code)}</span>
      </div>
      {application.min_score && (
        <div className="flex justify-between mt-1">
          <span>Điểm tối thiểu:</span>
          <span className="font-medium">{application.min_score}</span>
        </div>
      )}
      {application.academicYear?.year && (
        <div className="flex justify-between mt-1">
          <span>Năm học:</span>
          <span className="font-medium">{application.academicYear.year}</span>
        </div>
      )}
    </li>
  );
};

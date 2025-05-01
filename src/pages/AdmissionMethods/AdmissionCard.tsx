// src/components/AdmissionCard.tsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AdmissionCardProps {
  year: number;
  majors: string[];
  admissionMethods: string[];
  trainingInstitutions: string[];
  scholarships: string[];
}

const AdmissionCard: React.FC<AdmissionCardProps> = ({
  year,
  majors,
  admissionMethods,
  trainingInstitutions,
  scholarships,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 m-4 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        Tuyển Sinh {year}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold text-lg mb-2">Ngành Học</h3>
          <ul className="list-disc pl-5">
            {majors.map((major, index) => (
              <li key={index} className="text-gray-700">
                {major}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Phương Thức Tuyển Sinh</h3>
          <ul className="list-disc pl-5">
            {admissionMethods.map((method, index) => (
              <li key={index} className="text-gray-700">
                {method}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Chi Tiết</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Chi Tiết Tuyển Sinh {year}</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div>
                <h4 className="text-xl font-semibold mb-3">Cơ Sở Đào Tạo</h4>
                <ul className="list-disc pl-5">
                  {trainingInstitutions.map((institution, index) => (
                    <li key={index} className="text-gray-700">
                      {institution}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold mt-4 mb-3">Học Bổng</h4>
                <ul className="list-disc pl-5">
                  {scholarships.map((scholarship, index) => (
                    <li key={index} className="text-gray-700">
                      {scholarship}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdmissionCard;

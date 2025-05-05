import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, ExternalLink, Search } from "lucide-react";
import { AdmissionMethod, AdmissionMethodApplication } from "@/types/entities/admission-method";
import { AdmissionMethodApplicationItem } from "./AdmissionMethodApplicationItem";

interface AdmissionMethodsCardsProps {
  methods: AdmissionMethod[];
  onEdit: (method: AdmissionMethod) => void;
  onDelete?: (method: AdmissionMethod) => void;
  getCampusName: (code?: string) => string;
  getMajorName: (code?: string) => string;
}

export const AdmissionMethodsCards: React.FC<AdmissionMethodsCardsProps> = ({
  methods,
  onEdit,
  onDelete,
  getCampusName,
  getMajorName
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {methods.length === 0 ? (
        <div className="col-span-full text-center py-8 text-gray-500">
          <Search className="h-10 w-10 mx-auto mb-2 text-gray-300" />
          <p>Không tìm thấy phương thức tuyển sinh nào</p>
        </div>
      ) : (
        methods.map((method) => (
          <motion.div
            key={method.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-amber-50">
              <h3 className="text-lg font-semibold text-gray-800">{method.name}</h3>
            </div>
            <div className="p-5">
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{method.description}</p>
              
              <div className="mb-4">
                <a
                  href={method.application_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 flex items-center text-sm"
                >
                  <ExternalLink className="h-3 w-3 mr-1" /> {method.application_url}
                </a>
              </div>
              
              {method.applications && method.applications.length > 0 && (
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Cấu hình áp dụng:</h4>
                  <ul className="space-y-2">
                    {method.applications.map((app: AdmissionMethodApplication, index: number) => (
                      <AdmissionMethodApplicationItem
                        key={index}
                        application={app}
                        index={index}
                        getCampusName={getCampusName}
                        getMajorName={getMajorName}
                      />
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 text-gray-700 border-gray-300 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300"
                onClick={() => onEdit(method)}
              >
                <Edit className="h-3.5 w-3.5 mr-1" />
                Sửa
              </Button>
              {onDelete && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-red-600 border-gray-300 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                  onClick={() => onDelete(method)}
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                  Xóa
                </Button>
              )}
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
};

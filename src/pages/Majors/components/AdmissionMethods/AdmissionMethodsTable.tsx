import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, ExternalLink, Search } from "lucide-react";
import { AdmissionMethod } from "@/types/entities/admission-method";

interface AdmissionMethodsTableProps {
  methods: AdmissionMethod[];
  onEdit: (method: AdmissionMethod) => void;
  onDelete?: (method: AdmissionMethod) => void;
}

export const AdmissionMethodsTable: React.FC<AdmissionMethodsTableProps> = ({
  methods,
  onEdit,
  onDelete
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-700">Tên phương thức</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Mô tả</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">URL đăng ký</th>
            <th className="text-center py-3 px-4 font-medium text-gray-700">Số câu hình</th>
            <th className="text-center py-3 px-4 font-medium text-gray-700">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {methods.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-8 text-gray-500">
                <Search className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                <p>Không tìm thấy phương thức tuyển sinh nào</p>
              </td>
            </tr>
          ) : (
            methods.map((method) => (
              <motion.tr
                key={method.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-4 px-4">{method.name}</td>
                <td className="py-4 px-4">
                  <div className="max-w-md truncate">{method.description}</div>
                </td>
                <td className="py-4 px-4">
                  <a
                    href={method.application_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 flex items-center"
                  >
                    Liên kết <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </td>
                <td className="py-4 px-4 text-center">
                  {method.applications ? method.applications.length : 0}
                </td>
                <td className="py-4 px-4">
                  <div className="flex justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-2 text-gray-700 border-gray-300 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300"
                      onClick={() => onEdit(method)}
                    >
                      <Edit className="h-3.5 w-3.5 mr-1" />
                      Sửa
                    </Button>
                    {onDelete && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-2 text-red-600 border-gray-300 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                        onClick={() => onDelete(method)}
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                        Xóa
                      </Button>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

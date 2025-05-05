import React, { useState, useEffect } from "react";
import { Building2, Edit, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DormitoryForm } from "./DormitoryForm";
import { DeleteDormitoryDialog } from "./DormitoryForm";
import { Campus, Dormitory } from "@/types/campus";
import { dormitoriesApi } from "@/api/resources/dormitories";
import { toast } from "sonner";

interface DormitoryViewProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCampus: Campus | null;
}

export function DormitoryView({
  isOpen,
  onOpenChange,
  selectedCampus,
}: DormitoryViewProps) {
  const [dormitories, setDormitories] = useState<Dormitory[]>([]);
  const [isAddDormitoryDialogOpen, setIsAddDormitoryDialogOpen] =
    useState(false);
  const [isEditDormitoryDialogOpen, setIsEditDormitoryDialogOpen] =
    useState(false);
  const [isDeleteDormitoryDialogOpen, setIsDeleteDormitoryDialogOpen] =
    useState(false);
  const [selectedDormitory, setSelectedDormitory] = useState<Dormitory | null>(
    null
  );
  const [dormitoryToDelete, setDormitoryToDelete] = useState<Dormitory | null>(
    null
  );

  const fetchDormitories = async (campusId: number) => {
    try {
      const response = await dormitoriesApi.getByCampusId(campusId);
      if (response.data) {
        setDormitories(response.data);
      }
    } catch (error) {
      console.error("Error fetching dormitories:", error);
      toast.error("Không thể tải danh sách ký túc xá");
    }
  };

  useEffect(() => {
    if (selectedCampus && isOpen) {
      fetchDormitories(selectedCampus.id);
    }
  }, [selectedCampus, isOpen]);

  const handleAddDormitory = () => {
    setIsAddDormitoryDialogOpen(true);
  };

  const handleEditDormitory = (dormitory: Dormitory) => {
    setSelectedDormitory(dormitory);
    setIsEditDormitoryDialogOpen(true);
  };

  const handleDeleteDormitory = (dormitory: Dormitory) => {
    setDormitoryToDelete(dormitory);
    setIsDeleteDormitoryDialogOpen(true);
  };

  const confirmDeleteDormitory = async () => {
    if (dormitoryToDelete && selectedCampus) {
      try {
        await dormitoriesApi.delete(dormitoryToDelete.id);
        await fetchDormitories(selectedCampus.id);
        setIsDeleteDormitoryDialogOpen(false);
        toast.success("Xóa ký túc xá thành công");
      } catch (error) {
        console.error("Error deleting dormitory:", error);
        toast.error("Lỗi khi xóa ký túc xá");
      }
    }
  };

  const handleDormitoryFormSubmitSuccess = async () => {
    if (selectedCampus) {
      await fetchDormitories(selectedCampus.id);
      setIsAddDormitoryDialogOpen(false);
      setIsEditDormitoryDialogOpen(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[60vw] bg-white rounded-xl shadow-2xl border-none p-0 overflow-hidden">
          {selectedCampus && (
            <div className="flex flex-col h-full max-h-[80vh]">
              <div className="flex items-center justify-between border-b pb-4 p-6 bg-white">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <Building2 className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-orange-600">
                      Ký túc xá - {selectedCampus.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Quản lý danh sách ký túc xá của cơ sở
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleAddDormitory}
                  className="bg-orange-500 text-white hover:bg-orange-600 shadow-sm"
                  aria-hidden="false"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm ký túc xá
                </Button>
              </div>

              <div className="p-6 overflow-y-auto flex-grow">
                {dormitories.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-700">
                      Chưa có ký túc xá
                    </h3>
                    <p className="text-gray-500 mt-1">
                      Cơ sở này chưa có ký túc xá nào
                    </p>
                    <Button
                      onClick={handleAddDormitory}
                      className="mt-4 bg-orange-500 text-white hover:bg-orange-600"
                      aria-hidden="false"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Thêm ký túc xá mới
                    </Button>
                  </div>
                ) : (
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-100">
                          <TableHead className="w-1/4">Tên ký túc xá</TableHead>
                          <TableHead className="w-2/5">Mô tả</TableHead>
                          <TableHead className="text-center w-1/6">
                            Sức chứa
                          </TableHead>
                          <TableHead className="text-right w-1/6">
                            Thao tác
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dormitories.map((dormitory) => (
                          <TableRow key={dormitory.id}>
                            <TableCell className="font-medium">
                              {dormitory.name}
                            </TableCell>
                            <TableCell className="truncate max-w-[200px]">
                              {dormitory.description || "Không có mô tả"}
                            </TableCell>
                            <TableCell className="text-center">
                              {dormitory.capacity || 0} sinh viên
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                  onClick={() => handleEditDormitory(dormitory)}
                                  aria-hidden="false"
                                >
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Edit</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                  onClick={() =>
                                    handleDeleteDormitory(dormitory)
                                  }
                                  aria-hidden="false"
                                >
                                  <Trash className="h-4 w-4" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <DormitoryForm
        isOpen={isAddDormitoryDialogOpen}
        onOpenChange={setIsAddDormitoryDialogOpen}
        campusId={selectedCampus?.id || 0}
        onSubmitSuccess={handleDormitoryFormSubmitSuccess}
      />

      <DormitoryForm
        isOpen={isEditDormitoryDialogOpen}
        onOpenChange={setIsEditDormitoryDialogOpen}
        initialData={selectedDormitory}
        campusId={selectedCampus?.id || 0}
        onSubmitSuccess={handleDormitoryFormSubmitSuccess}
      />

      <DeleteDormitoryDialog
        isOpen={isDeleteDormitoryDialogOpen}
        onClose={() => setIsDeleteDormitoryDialogOpen(false)}
        onConfirm={confirmDeleteDormitory}
        dormitoryName={dormitoryToDelete?.name}
      />
    </>
  );
}

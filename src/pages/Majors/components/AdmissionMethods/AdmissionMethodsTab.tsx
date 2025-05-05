import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { admissionMethodsApi } from "@/api/resources/admission-methods";
import { AdmissionMethod } from "@/types/entities/admission-method";

// Import các component con
import {
  AdmissionMethodsHeader,
  AdmissionMethodsSearch,
  AdmissionMethodsTable,
  AdmissionMethodsCards,
  AdmissionMethodForm,
  LoadingState,
  ErrorState,
  DeleteAdmissionMethodDialog
} from "./";

const AdmissionMethodsTab: React.FC = () => {
  // State
  const [admissionMethods, setAdmissionMethods] = useState<AdmissionMethod[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("bảng");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Dialog state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [selectedMethod, setSelectedMethod] = useState<AdmissionMethod | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    application_url: "",
    evaluationType: ""
  });

  // Fetch admission methods
  useEffect(() => {
    fetchAdmissionMethods();
  }, []);

  const fetchAdmissionMethods = async () => {
    try {
      setLoading(true);
      const response = await admissionMethodsApi.getAll();
      if (response.success && response.data) {
        setAdmissionMethods(response.data);
      } else {
        setError("Không thể tải dữ liệu phương thức tuyển sinh");
      }
    } catch (error) {
      console.error("Lỗi khi tải phương thức tuyển sinh:", error);
      setError("Đã xảy ra lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  // Filter admission methods based on search term
  const filteredMethods = admissionMethods.filter(method =>
    method.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    method.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Handle select change
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      evaluationType: value
    }));
  };

  // Open add dialog
  const handleAddNew = () => {
    setFormData({
      name: "",
      description: "",
      application_url: "",
      evaluationType: ""
    });
    setIsAddDialogOpen(true);
  };

  // Open edit dialog
  const handleEdit = (method: AdmissionMethod) => {
    setSelectedMethod(method);
    setFormData({
      name: method.name,
      description: method.description,
      application_url: method.application_url,
      evaluationType: ""
    });
    setIsEditDialogOpen(true);
  };

  // Handle save new admission method
  const handleSaveNew = async () => {
    try {
      setLoading(true);
      // Prepare data for API
      const newMethodData = {
        name: formData.name,
        description: formData.description,
        application_url: formData.application_url,
        code: formData.evaluationType || undefined
      };

      // Call API to create new admission method
      const response = await admissionMethodsApi.create(newMethodData);

      if (response.success) {
        toast.success("Đã thêm phương thức tuyển sinh mới thành công");
        setIsAddDialogOpen(false);
        await fetchAdmissionMethods();
      } else {
        toast.error(response.message || "Không thể thêm phương thức tuyển sinh");
      }
    } catch (error) {
      console.error("Lỗi khi thêm phương thức tuyển sinh:", error);
      toast.error("Đã xảy ra lỗi khi thêm phương thức tuyển sinh");
    } finally {
      setLoading(false);
    }
  };

  // Handle update admission method
  const handleUpdate = async () => {
    if (!selectedMethod) return;

    try {
      setLoading(true);
      // Prepare data for API
      const updateData = {
        name: formData.name,
        description: formData.description,
        application_url: formData.application_url,
        code: formData.evaluationType || undefined
      };

      // Call API to update admission method
      const response = await admissionMethodsApi.update(selectedMethod.id.toString(), updateData);

      if (response.success) {
        toast.success("Đã cập nhật phương thức tuyển sinh thành công");
        setIsEditDialogOpen(false);
        await fetchAdmissionMethods();
      } else {
        toast.error(response.message || "Không thể cập nhật phương thức tuyển sinh");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật phương thức tuyển sinh:", error);
      toast.error("Đã xảy ra lỗi khi cập nhật phương thức tuyển sinh");
    } finally {
      setLoading(false);
    }
  };

  // Open delete dialog
  const handleDelete = (method: AdmissionMethod) => {
    setSelectedMethod(method);
    setIsDeleteDialogOpen(true);
  };

  // Handle confirm delete admission method
  const handleConfirmDelete = async () => {
    if (!selectedMethod) return;

    try {
      setDeleteLoading(true);

      // Call API to delete admission method
      const response = await admissionMethodsApi.delete(selectedMethod.id.toString());

      if (response.success) {
        toast.success("Đã xóa phương thức tuyển sinh thành công");
        setIsDeleteDialogOpen(false);
        await fetchAdmissionMethods();
      } else {
        toast.error(response.message || "Không thể xóa phương thức tuyển sinh");
      }
    } catch (error) {
      console.error("Lỗi khi xóa phương thức tuyển sinh:", error);
      toast.error("Đã xảy ra lỗi khi xóa phương thức tuyển sinh");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Get campus name from code
  const getCampusName = (code?: string) => {
    if (!code) return "";
    const campusMap: Record<string, string> = {
      "HN": "Đại học FPT - Hà Nội",
      "HCM": "Đại học FPT - TP.HCM",
      "DN": "Đại học FPT - Đà Nẵng",
      "CT": "Đại học FPT - Cần Thơ",
      "QN": "Đại học FPT - Quy Nhơn"
    };
    return campusMap[code] || code;
  };

  // Get major name from code
  const getMajorName = (code?: string) => {
    if (!code) return "Tất cả ngành";
    const majorMap: Record<string, string> = {
      "7480103": "Kỹ thuật phần mềm",
      "7480201": "Công nghệ thông tin",
      "7480107": "Trí tuệ nhân tạo",
      "7480104": "Hệ thống thông tin",
      "7480106": "Kỹ thuật máy tính"
    };
    return majorMap[code] || code;
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      {/* Header */}
      <AdmissionMethodsHeader onAddNew={handleAddNew} />

      {/* Search */}
      <AdmissionMethodsSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        resultsCount={filteredMethods.length}
      />

      {/* Content */}
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState error={error} onRetry={fetchAdmissionMethods} />
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b border-gray-200 mb-6">
            <TabsList className="w-[180px]">
              <TabsTrigger value="bảng" className="flex-1">Bảng</TabsTrigger>
              <TabsTrigger value="thẻ" className="flex-1">Thẻ</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="bảng" className="mt-0">
            <AdmissionMethodsTable
              methods={filteredMethods}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </TabsContent>

          <TabsContent value="thẻ" className="mt-0">
            <AdmissionMethodsCards
              methods={filteredMethods}
              onEdit={handleEdit}
              onDelete={handleDelete}
              getCampusName={getCampusName}
              getMajorName={getMajorName}
            />
          </TabsContent>
        </Tabs>
      )}

      {/* Dialog thêm phương thức tuyển sinh mới */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Thêm phương thức tuyển sinh mới</DialogTitle>
            <DialogDescription>
              Nhập thông tin chi tiết về phương thức tuyển sinh mới
            </DialogDescription>
          </DialogHeader>

          <AdmissionMethodForm
            formData={formData}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
            onCancel={() => setIsAddDialogOpen(false)}
            onSubmit={handleSaveNew}
            isLoading={loading}
            submitLabel="Lưu"
          />
        </DialogContent>
      </Dialog>

      {/* Dialog chỉnh sửa phương thức tuyển sinh */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Chỉnh sửa phương thức tuyển sinh</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin phương thức tuyển sinh
            </DialogDescription>
          </DialogHeader>

          <AdmissionMethodForm
            formData={formData}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
            onCancel={() => setIsEditDialogOpen(false)}
            onSubmit={handleUpdate}
            isLoading={loading}
            submitLabel="Lưu thay đổi"
          />
        </DialogContent>
      </Dialog>

      {/* Dialog xác nhận xóa phương thức tuyển sinh */}
      <DeleteAdmissionMethodDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        method={selectedMethod}
        onConfirm={handleConfirmDelete}
        isLoading={deleteLoading}
      />
    </div>
  );
};

export default AdmissionMethodsTab;

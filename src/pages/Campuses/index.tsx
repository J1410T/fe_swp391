import { Suspense, useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { Loading } from "@/components/common/loading";
import { ErrorBoundary } from "@/components/common/error-boundary";
import type { CampusesLoaderResponse } from "@/types/loaders/campus";
import { campusesApi, type CampusResponse } from "@/api/resources/campuses";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Edit,
  HouseIcon,
  Mail,
  MapPin,
  Phone,
  PlusIcon,
  Trash,
} from "lucide-react";
import { CampusForm, DeleteDialog } from "./CampusForm";
import { DormitoryView } from "./DormitoryView";

/**
 * Component nội dung của trang Campuses
 */
function CampusesContent(): React.ReactElement {
  // Lấy dữ liệu từ loader
  useLoaderData<CampusesLoaderResponse>();

  const [campuses, setCampuses] = useState<CampusResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCampus, setSelectedCampus] = useState<CampusResponse | null>(
    null
  );
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isAddCampusDialogOpen, setIsAddCampusDialogOpen] = useState(false);
  const [isEditCampusDialogOpen, setIsEditCampusDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [campusToDelete, setCampusToDelete] = useState<CampusResponse | null>(
    null
  );

  const fetchCampuses = async () => {
    try {
      setIsLoading(true);
      const response = await campusesApi.getAll();
      if (response.data) {
        setCampuses(response.data);
      }
    } catch (err) {
      setError("Không thể tải dữ liệu cơ sở đào tạo");
      console.error("Error fetching campuses:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCampuses();
  }, []);

  const handleViewDormitoryDetails = (campusData: CampusResponse) => {
    setSelectedCampus(campusData);
    setIsDetailDialogOpen(true);
  };

  const handleDeleteCampus = async () => {
    if (campusToDelete) {
      try {
        await campusesApi.delete(campusToDelete.id);
        fetchCampuses();
        setIsDeleteDialogOpen(false);
        setCampusToDelete(null);
      } catch (error) {
        console.error("Error deleting campus:", error);
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-centers p-4 rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="bg-gray-100 p-3 rounded-full">
            <HouseIcon className="h-8 w-8 text-orange-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-orange-600">
              Cơ sở Đào tạo
            </h1>
            <p className="text-gray-500 mt-1">
              Quản lý thông tin các cơ sở Đại học FPT trên toàn quốc
            </p>
          </div>
        </div>
        <Button
          onClick={() => setIsAddCampusDialogOpen(true)}
          className="bg-orange-400 text-white hover:bg-orange-400 shadow-sm transition-all duration-300 px-5"
          aria-hidden="false"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Thêm cơ sở mới
        </Button>
      </div>
      <CampusForm
        isOpen={isAddCampusDialogOpen}
        onOpenChange={setIsAddCampusDialogOpen}
        onSubmitSuccess={fetchCampuses}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campuses.map((campus) => (
          <Card
            key={campus.id}
            className="group overflow-hidden hover:shadow-xl transition-all duration-300 rounded-xl border border-gray-200 bg-white transform hover:-translate-y-1 flex flex-col"
          >
            <div className="p-0">
              <div className="flex flex-row items-start justify-between p-5 relative">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="bg-orange-600 h-6 w-1 rounded-full"></div>
                    <span className="text-sm font-semibold text-orange-600 uppercase tracking-wider">
                      {campus.code}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-orange-400">
                    {campus.name}
                  </h3>
                </div>
                <div className="flex space-x-1 absolute top-4 right-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-gray-100 hover:bg-gray-300 text-blue-600 hover:text-blue-700 shadow-sm"
                    onClick={() => {
                      setSelectedCampus(campus);
                      setIsEditCampusDialogOpen(true);
                    }}
                    aria-hidden="false"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-gray-100 hover:bg-gray-300 text-red-600 hover:text-red-700 shadow-sm"
                    onClick={() => {
                      setCampusToDelete(campus);
                      setIsDeleteDialogOpen(true);
                    }}
                    aria-hidden="false"
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            </div>

            <CampusForm
              isOpen={isEditCampusDialogOpen}
              onOpenChange={setIsEditCampusDialogOpen}
              initialData={selectedCampus}
              onSubmitSuccess={fetchCampuses}
            />

            <div className="p-5 flex-grow">
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Địa chỉ:
                    </span>
                    <p className="text-gray-700">
                      {campus.address || "Chưa cập nhật"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Số điện thoại:
                    </span>
                    <p className="text-gray-700">
                      {campus.contact.phone || "Chưa cập nhật"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Email:
                    </span>
                    <p className="text-gray-700">
                      {campus.contact.email || "Chưa cập nhật"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-t border-gray-200 mt-auto">
              <div className="flex justify-center items-center p-4">
                <Button
                  className="w-full bg-orange-400 text-white hover:bg-orange-400 shadow-md hover:shadow-lg transition-all duration-300 px-5"
                  onClick={() => handleViewDormitoryDetails(campus)}
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  Xem Ký túc xá
                </Button>
              </div>
            </div>

            <DeleteDialog
              isOpen={isDeleteDialogOpen}
              onClose={() => setIsDeleteDialogOpen(false)}
              onConfirm={handleDeleteCampus}
              campusName={campusToDelete?.name}
            />
          </Card>
        ))}
      </div>

      <DormitoryView
        isOpen={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        selectedCampus={selectedCampus}
      />
    </div>
  );
}

/**
 * Trang quản lý cơ sở đào tạo
 */
export function Campuses(): React.ReactElement {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-4 border border-red-300 rounded-md text-red-500">
          Đã xảy ra lỗi khi tải dữ liệu cơ sở đào tạo
        </div>
      }
    >
      <Suspense fallback={<Loading />}>
        <CampusesContent />
      </Suspense>
    </ErrorBoundary>
  );
}

export default Campuses;

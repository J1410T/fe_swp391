import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsCard from "@/components/Cards/StatsCard";
import RoomCard from "@/components/Cards/RoomCard";
// import Pagination from "@/components/Cards/pagination";
import { Dormitory } from "./DormitoryForm";
import RoomFilters from "@/components/Filter/RoomFilter";
import DormitoryDialog from "@/components/Dialog/DormitoryDialog";
import ConfirmDeleteDialog from "@/components/Dialog/ConfirmDeleteDialog";
import { showToast } from "@/lib/toastHelper";

const mockDormitories: Dormitory[] = [
  {
    id: "1",
    name: "Phòng A101",
    building: "Tòa A",
    roomType: 4,
    capacity: 4,
    price: 700000,
    status: "Available",
    campus_id: "campus_1",
    description: "Phòng dành cho 4 người",
    roomNumber: "A101",
  },
  {
    id: "2",
    name: "Phòng A102",
    building: "Tòa A",
    roomType: 4,
    capacity: 2,
    price: 700000,
    status: "Available",
    campus_id: "campus_1",
    description: "Phòng dành cho 4 người",
    roomNumber: "A102",
  },
  {
    id: "3",
    name: "Phòng A103",
    building: "Tòa A",
    roomType: 4,
    capacity: 0,
    price: 700000,
    status: "Full",
    campus_id: "campus_1",
    description: "Phòng đã đầy",
    roomNumber: "A103",
  },
  {
    id: "4",
    name: "Phòng B101",
    building: "Tòa B",
    roomType: 2,
    capacity: 0,
    price: 900000,
    status: "Full",
    campus_id: "campus_2",
    description: "Phòng đã đầy",
    roomNumber: "B101",
  },
  {
    id: "5",
    name: "Phòng B102",
    building: "Tòa B",
    roomType: 2,
    capacity: 2,
    price: 900000,
    status: "Full",
    campus_id: "campus_2",
    description: "Phòng dành cho 2 người",
    roomNumber: "B102",
  },
  {
    id: "6",
    name: "Phòng B103",
    building: "Tòa B",
    roomType: 2,
    capacity: 1,
    price: 900000,
    status: "Available",
    campus_id: "campus_2",
    description: "Phòng dành cho 2 người",
    roomNumber: "B103",
  },
];

const StatsCardData: {
  title: string;
  value: string;
  subtitle: string;
  color: "blue" | "green" | "orange" | "purple";
}[] = [
  {
    title: "Tổng số phòng",
    value: "120",
    subtitle: "4 tòa nhà",
    color: "blue",
  },
  {
    title: "Phòng trống",
    value: "32",
    subtitle: "26.7% còn trống",
    color: "green",
  },
  {
    title: "Sinh viên đang ở",
    value: "352",
    subtitle: "88 phòng đã sử dụng",
    color: "orange",
  },
  {
    title: "Đơn đăng ký mới",
    value: "15",
    subtitle: "Chờ xử lý",
    color: "purple",
  },
];

const DormitoryPage: React.FC = () => {
  const [dormitory, setDormitories] = useState(mockDormitories);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selected, setSelected] = useState<Dormitory | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Dormitory | null>(null);
  const [isViewMode, setIsViewMode] = useState(false);

  const setActiveTab = useState("rooms")[1];

  // Filter dormitories based on search and status
  const filtered = dormitory.filter((room) => {
    const matchesSearch = room.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      room.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleAdd = () => {
    setSelected(null);
    setIsFormOpen(true);
  };

  const handleEdit = (room: Dormitory) => {
    setSelected(room);
    setIsViewMode(false);
    setIsFormOpen(true);
  };

  const handleDelete = (room: Dormitory) => {
    setDeleteTarget(room);
    setConfirmDeleteOpen(true);
  };
  const handleView = (room: Dormitory) => {
    setSelected(room);
    setIsViewMode(true);
    setIsFormOpen(true);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      setDormitories(dormitory.filter((room) => room.id !== deleteTarget.id));
      setDeleteTarget(null);
      setConfirmDeleteOpen(false);
      showToast("success", "delete", true);
    } else {
      showToast("error", "delete", false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Form for Add/Edit/Delete Room */}
      <DormitoryDialog
        isOpen={isFormOpen}
        selected={selected}
        mode={selected ? (isViewMode ? "view" : "edit") : "add"}
        onClose={() => setIsFormOpen(false)}
        onSubmit={(data) => {
          if (selected) {
            //edit action
            setDormitories(
              dormitory.map((room) =>
                room.id === selected.id ? { ...room, ...data } : room
              )
            );
            showToast("success", "edit", true);
          } else {
            //add action
            setDormitories([
              ...dormitory,
              { ...data, id: String(dormitory.length + 1) },
            ]);
            showToast("success", "add", true);
          }
          setIsFormOpen(false);
        }}
      />

      <ConfirmDeleteDialog
        isOpen={confirmDeleteOpen}
        room={deleteTarget}
        onClose={() => setConfirmDeleteOpen(false)}
        onDelete={confirmDelete}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {StatsCardData.map((item) => (
          <StatsCard
            key={item.title}
            title={item.title}
            value={item.value}
            subtitle={item.subtitle}
            color={item.color}
          />
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="rooms" onValueChange={setActiveTab}>
        <TabsList className="border-b w-full rounded-none h-auto p-0 bg-transparent border-neutral-200">
          <TabsTrigger
            value="rooms"
            className="rounded-none border-b-2 px-4 py-2 data-[state=active]:text-orange-500 border-transparent font-medium"
          >
            Danh sách phòng
          </TabsTrigger>
          <TabsTrigger
            value="registrations"
            className="rounded-none border-b-2 px-4 py-2 data-[state=active]:text-orange-500 border-transparent font-medium"
          >
            Đơn đăng ký
          </TabsTrigger>
          <TabsTrigger
            value="students"
            className="rounded-none border-b-2 px-4 py-2 data-[state=active]:text-orange-500 border-transparent font-medium"
          >
            Danh sách sinh viên
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rooms" className="mt-6">
          {/* Filters */}
          <RoomFilters
            search={search}
            filterStatus={filterStatus}
            onSearchChange={setSearch}
            onFilterStatusChange={setFilterStatus}
            onAddRoom={handleAdd}
          />

          {/* Room List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((room) => (
              <RoomCard
                key={room.id}
                roomNumber={room.name}
                building={room.building}
                roomType={room.roomType}
                capacity={room.capacity}
                price={room.price}
                status={room.status ? "available" : "full"}
                onEdit={() => handleEdit(room)}
                onDelete={() => handleDelete(room)}
                onView={() => handleView(room)}
              />
            ))}
          </div>

          {/* Pagination */}
          {/* <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Hiển thị 1-6 trên tổng số 120 phòng
            </div>
            <Pagination currentPage={1} totalPages={20} />
          </div> */}
        </TabsContent>

        {/* Other Tabs (registrations, students) */}
        <TabsContent value="registrations">
          <div className="flex items-center justify-center h-40 border rounded-md">
            <p className="text-muted-foreground">Nội dung đơn đăng ký</p>
          </div>
        </TabsContent>

        <TabsContent value="students">
          <div className="flex items-center justify-center h-40 border rounded-md">
            <p className="text-muted-foreground">
              Nội dung danh sách sinh viên
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default DormitoryPage;

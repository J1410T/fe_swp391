import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/formatCurrency";
import { Trash } from "lucide-react";

interface RoomCardProps {
  roomNumber: string;
  status: "available" | "full";
  building: string;
  roomType: number;
  capacity: number;
  price: number;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
}

export default function RoomCard({
  roomNumber,
  status,
  building,
  roomType,
  capacity,
  price,
  onEdit,
  onDelete,
  onView,
}: RoomCardProps) {
  const statusMap = {
    available: {
      label: "Còn chỗ",
      color: "bg-yellow-100 text-yellow-800",
    },
    full: {
      label: "Đã đầy",
      color: "bg-red-100 text-red-800",
    },
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="font-medium">{roomNumber}</h3>
        <span
          className={`px-2 py-1 rounded-md text-xs font-medium ${statusMap[status].color}`}
        >
          {statusMap[status].label}
        </span>
      </div>
      <div className="p-4 grid grid-cols-2 gap-y-4">
        <div>
          <p className="text-sm text-gray-500">Tòa nhà</p>
          <p className="font-medium">{building}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Loại phòng</p>
          <p className="font-medium">{roomType + " người"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Đã đăng ký</p>
          <p className="font-medium">{capacity}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Giá/tháng</p>
          <p className="font-medium">{formatCurrency(price)}</p>
        </div>
      </div>
      <div className="p-4 flex gap-2 border-t">
        <Button
          variant="outline"
          size="sm"
          className="text-blue-600"
          onClick={onView}
        >
          Chi tiết
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:bg-blue-50"
          onClick={onEdit}
        >
          Chỉnh sửa
        </Button>
        <div className="ml-auto">
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:bg-red-50"
            onClick={onDelete}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

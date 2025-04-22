import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface RoomFiltersProps {
  search: string;
  filterStatus: string;
  onSearchChange: (value: string) => void;
  onFilterStatusChange: (value: string) => void;
  onAddRoom: () => void;
}

const RoomFilters: React.FC<RoomFiltersProps> = ({
  search,
  filterStatus,
  onSearchChange,
  onFilterStatusChange,
  onAddRoom,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Tìm"
          className="pl-10 w-full md:w-[200px]"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Select value={filterStatus} onValueChange={onFilterStatusChange}>
        <SelectTrigger className="w-full md:w-[250px]">
          <SelectValue placeholder="Tất cả trạng thái" />
        </SelectTrigger>
        <SelectContent className="border-none">
          <SelectItem value="all">Tất cả trạng thái</SelectItem>
          <SelectItem value="available">Còn chỗ</SelectItem>
          <SelectItem value="full">Đã đầy</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex-1 flex justify-end">
        <Button
          onClick={onAddRoom}
          className="bg-orange-500 hover:bg-orange-600 ml-auto"
        >
          <Plus className="h-4 w-4 mr-2" /> Thêm phòng mới
        </Button>
      </div>
    </div>
  );
};

export default RoomFilters;

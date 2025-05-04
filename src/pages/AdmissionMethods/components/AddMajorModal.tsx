import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { toast } from "sonner";

interface Major {
  id: number;
  code: string;
  name: string;
}

interface AddMajorModalProps {
  isOpen: boolean;
  onClose: () => void;
  academicYear: string;
  onSuccess: () => Promise<void>;
}

export function AddMajorModal({
  isOpen,
  onClose,
  academicYear,
  onSuccess,
}: AddMajorModalProps) {
  // Danh sách các ngành học mẫu để hiển thị
  const [majors] = useState<Major[]>([
    { id: 1, code: "7480101", name: "Khoa học máy tính" },
    { id: 2, code: "7480102", name: "Mạng máy tính và truyền thông" },
    { id: 3, code: "7480103", name: "Kỹ thuật phần mềm" },
    { id: 4, code: "7480104", name: "Hệ thống thông tin" },
    { id: 5, code: "7480106", name: "Kỹ thuật máy tính" },
    { id: 6, code: "7480201", name: "Công nghệ thông tin" },
    { id: 7, code: "7480108", name: "Trí tuệ nhân tạo" },
  ]);
  
  const [selectedMajors, setSelectedMajors] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredMajors = majors.filter(
    (major) =>
      major.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      major.code.includes(searchTerm)
  );

  const toggleSelectMajor = (id: number) => {
    setSelectedMajors((prev) =>
      prev.includes(id)
        ? prev.filter((majorId) => majorId !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedMajors.length === filteredMajors.length) {
      setSelectedMajors([]);
    } else {
      setSelectedMajors(filteredMajors.map((major) => major.id));
    }
  };

  const handleSubmit = async () => {
    if (selectedMajors.length === 0) {
      toast.error("Vui lòng chọn ít nhất một ngành");
      return;
    }

    try {
      setLoading(true);
      // Mô phỏng API gọi để thêm ngành vào năm tuyển sinh
      // Trong thực tế, bạn sẽ gọi API thực tế ở đây
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      toast.success(`Đã thêm ${selectedMajors.length} ngành vào năm tuyển sinh ${academicYear}`);
      await onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Không thể thêm ngành vào năm tuyển sinh");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Thêm ngành tuyển sinh cho năm {academicYear}</DialogTitle>
          <DialogDescription>
            Chọn các ngành học cần thêm vào năm tuyển sinh {academicYear}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm ngành học..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="border rounded-md max-h-[400px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={
                        filteredMajors.length > 0 &&
                        selectedMajors.length === filteredMajors.length
                      }
                      onCheckedChange={selectAll}
                      aria-label="Chọn tất cả"
                    />
                  </TableHead>
                  <TableHead className="w-[100px]">Mã ngành</TableHead>
                  <TableHead>Tên ngành</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMajors.length > 0 ? (
                  filteredMajors.map((major) => (
                    <TableRow
                      key={major.id}
                      className="cursor-pointer"
                      onClick={() => toggleSelectMajor(major.id)}
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedMajors.includes(major.id)}
                          onCheckedChange={() => toggleSelectMajor(major.id)}
                          aria-label={`Chọn ngành ${major.name}`}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{major.code}</TableCell>
                      <TableCell>{major.name}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-6">
                      Không tìm thấy ngành học nào
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <div className="text-sm text-muted-foreground">
            Đã chọn {selectedMajors.length} ngành
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Hủy
            </Button>
            <Button
              variant="default"
              onClick={handleSubmit}
              disabled={loading || selectedMajors.length === 0}
              className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white"
            >
              {loading ? "Đang thêm..." : "Thêm ngành"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

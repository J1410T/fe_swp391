import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Dormitory } from "@/pages/Staff/Dormitory/DormitoryForm";

interface ConfirmDeleteDialogProps {
  isOpen: boolean;
  room: Dormitory | null;
  onClose: () => void;
  onDelete: () => void;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  isOpen,
  room,
  onClose,
  onDelete,
}) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Xác nhận xóa phòng</DialogTitle>
      </DialogHeader>
      <p>
        Bạn có chắc chắn muốn xóa phòng <strong>{room?.name}</strong> không?
      </p>
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onClose}>
          Hủy
        </Button>
        <Button variant="destructive" onClick={onDelete}>
          Xóa
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);

export default ConfirmDeleteDialog;

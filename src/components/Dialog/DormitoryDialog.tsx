import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DormitoryForm,
  Dormitory,
} from "@/pages/Staff/Dormitory/DormitoryForm";
// import { Button } from "@/components/ui/button";

interface DormitoryDialogProps {
  isOpen: boolean;
  selected: Dormitory | null;
  mode: "add" | "edit" | "view";
  onClose: () => void;
  onSubmit: (data: Dormitory) => void;
}

const DormitoryDialog: React.FC<DormitoryDialogProps> = ({
  isOpen,
  selected,
  mode,
  onClose,
  onSubmit,
}) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>
          {selected ? "Chỉnh sửa phòng" : "Thêm phòng mới"}
        </DialogTitle>
      </DialogHeader>
      <DormitoryForm
        data={selected || {}}
        mode={mode}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </DialogContent>
  </Dialog>
);

export default DormitoryDialog;

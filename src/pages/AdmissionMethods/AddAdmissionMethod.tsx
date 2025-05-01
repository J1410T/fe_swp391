import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SuccessScreen } from "./components/SuccessScreen";
import { AdmissionMethodForm } from "./components/AdmissionMethodForm";
import { useAdmissionMethodForm } from "./hooks/useAdmissionMethodForm";

/**
 * Component thêm phương thức tuyển sinh mới
 * @param onSuccess Callback khi thêm thành công
 */
export function AddAdmissionMethod({
  onSuccess,
}: {
  onSuccess: () => void;
}): React.ReactElement {
  const [open, setOpen] = useState(false);

  // Sử dụng custom hook để quản lý logic form
  const {
    formData,
    loading,
    status,
    statusMessage,
    showSuccessScreen,
    countdown,
    addedMethod,
    handleChange,
    handleSubmit,
    handleContinue,
    resetForm,
    setNextId,
  } = useAdmissionMethodForm({
    onSuccess,
    onClose: () => setOpen(false),
  });

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        // Reset nextId khi mở dialog để lấy lại ID mới nhất
        if (isOpen && !open) {
          setNextId(null);
        } else if (!isOpen && open) {
          resetForm();
        }
        setOpen(isOpen);
      }}
    >
      <Dialog.Trigger asChild>
        <Button className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 transition-colors duration-300 shadow-md hover:shadow-lg rounded-lg font-medium">
          <PlusCircle className="mr-2 h-5 w-5" />
          Thêm phương thức tuyển sinh
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-[95%] max-w-xl translate-x-[-50%] translate-y-[-50%] rounded-xl border-2 border-orange-400 bg-white overflow-hidden shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          <div className="relative bg-gradient-to-r from-orange-400 to-amber-500 p-6 pb-4 rounded-t-xl">
            <Dialog.Title className="text-2xl whitespace-nowrap font-bold text-center text-white overflow-hidden text-ellipsis max-w-[90%] mx-auto">
              Thêm phương thức tuyển sinh mới
            </Dialog.Title>
            <Dialog.Description className="text-center text-white/90 mt-2 text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[90%] mx-auto">
              Điền thông tin phương thức tuyển sinh mới vào form dưới đây
            </Dialog.Description>

            <Dialog.Close asChild>
              <button
                type="button"
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-white/80"
                aria-label="Đóng"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </Dialog.Close>
          </div>

          {showSuccessScreen ? (
            <SuccessScreen
              addedMethod={addedMethod}
              countdown={countdown}
              onContinue={handleContinue}
            />
          ) : (
            <AdmissionMethodForm
              formData={formData}
              loading={loading}
              status={status}
              statusMessage={statusMessage}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              onCancel={() => setOpen(false)}
            />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

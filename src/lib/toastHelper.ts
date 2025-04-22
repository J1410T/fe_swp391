import { toast } from "sonner";

type ToastType = "success" | "error";

export const showToast = (
  type: ToastType,
  action: "add" | "edit" | "delete",
  isSuccess: boolean
) => {
  const capitalized = action.charAt(0).toUpperCase() + action.slice(1);
  if (isSuccess) {
    toast.success(`${capitalized} successfully`);
  } else {
    toast.error(`${capitalized} failed`);
  }
};

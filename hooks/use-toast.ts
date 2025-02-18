import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast";
import { useToast as useToastOriginal } from "@/components/ui/toast";

export type ToasterToast = ToastProps & {
  id: string;
  title?: string;
  description?: string;
  action?: ToastActionElement;
};

export function useToast() {
  const context = useToastOriginal(); // Ensure this gets the full context

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return {
    toast: (props: Omit<ToasterToast, "id">) => context.toast(props),
    toasts: context.toasts, // ✅ Make sure toasts is passed
  };
}

import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast"
import {
  useToast as useToastOriginal,
  toast as toastOriginal,
} from "@/components/ui/toast"

export type ToasterToast = ToastProps & {
  id: string
  title?: string
  description?: string
  action?: ToastActionElement
}

export function useToast() {
  const { toast, ...rest } = useToastOriginal()

  return {
    toast: (props: Omit<ToasterToast, "id">) => toast(props),
    ...rest,
  }
}
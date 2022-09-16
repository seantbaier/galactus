import * as RadixToast from "@radix-ui/react-toast"
import { classNames } from "/@/utils/tailwind"

type ToastProps = {
  open: boolean
  onOpenChange: (input: boolean) => void
  title: string
  actionLabel?: string
}

function Toast({ title, open, onOpenChange, actionLabel = "Dismiss" }: ToastProps): JSX.Element {
  return (
    <RadixToast.Root
      className={classNames(
        "bg-black-main rounded-md p-[15px] flex items-center border shadow-md shadow-primary-dark border-primary-light justify-between",
        open ? "animate-slide-in" : "animate-hide",
      )}
      open={open}
      onOpenChange={onOpenChange}
    >
      <RadixToast.Title className="text-sm text-white-main">{title}</RadixToast.Title>
      <RadixToast.Action className="flex" asChild altText={title}>
        <button
          className={classNames(
            "inline-flex items-center jusitfy-center rounded-sm py-0 px-[15px]",
            "text-sm h-[25px] text-primary-light",
          )}
          type="button"
        >
          {actionLabel}
        </button>
      </RadixToast.Action>
    </RadixToast.Root>
  )
}

export default Toast

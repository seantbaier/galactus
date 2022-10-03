import { classNames } from "/@/utils/tailwind"

interface ButtonProps {
  text?: string
  onClick?: () => void
  className?: string
  type?: "submit" | "button" | "reset" | undefined
}

export function Button({
  text = "Submit",
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "text-xs text-white-main font-semibold",
        "px-6 py-2 rounded-3xl",
        "bg-black-main border-4 border-primary-light",
        className,
      )}
      type={type}
    >
      {text}
    </button>
  )
}

export function CancelButton({
  text = "Submit",
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "text-xs text-gray-500 font-semibold",
        "px-6 py-2 rounded-3xl",
        "bg-black-main border-4 border-gray-600",
        className,
      )}
      type={type}
    >
      {text}
    </button>
  )
}

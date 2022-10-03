import { classNames } from "/@/utils/tailwind"

interface ButtonProps {
  text?: string
  onClick?: () => void
  className?: string
  type?: "submit" | "button" | "reset" | undefined
}

function CircleButton({ text = "+", onClick, type = "button", className = "" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "text-xs text-white-main font-semibold rounded-3xl w-6 h-6",
        "bg-black-main border-4 border-primary-light",
        className,
      )}
      type={type}
    >
      {text}
    </button>
  )
}

export default CircleButton

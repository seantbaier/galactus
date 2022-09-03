import { classNames } from "/@/utils/tailwind"

interface ButtonProps {
  text: string
  onClick: () => void
}

function Button({ text, onClick }: ButtonProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "px-6 py-2 rounded-3xl bg-black-main font-semibold text-white-main border-4 border-primary-light",
      )}
      type="button"
    >
      {text}
    </button>
  )
}

export default Button

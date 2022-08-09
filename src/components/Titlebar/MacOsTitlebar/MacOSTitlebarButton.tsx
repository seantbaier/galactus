// Constants
import { classNames } from "/@/utils/tailwind"

const MAC_OS_BUTTON_SIZE = "w-[11px] h-[11px]"

export type MacOSTitleButtonActions = "minimize" | "maximize" | "close"

type MacOSTitlebarButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode
  color: string
  className?: string
}

function MacOSTitlebarButton({
  onClick,
  children,
  color,
  className = "",
}: MacOSTitlebarButtonProps): JSX.Element {
  return (
    <button
      className={classNames(
        "flex justify-center align-center border-none p-0 rounded-xl ",
        MAC_OS_BUTTON_SIZE,
        color,
        className,
      )}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default MacOSTitlebarButton

import { useState, useRef, useEffect } from "react"

import { SystemConfigItemStatus } from "/@/views/System"

import { classNames } from "/@/utils/tailwind"

type StatusOptionsType = {
  [key: string]: string
}

const statusOptions: StatusOptionsType = {
  running: "bg-green-600",
  pending: "animate-pulse bg-yellow-900",
  failed: "bg-red-600",
}

type StatusIndicatorProps = {
  className?: string
  title: string
  status: SystemConfigItemStatus
  setOpen?: (open: boolean) => void
  callback?: () => void
}

function StatusIndicator({
  title,
  status,
  setOpen,
  callback,
  className = "",
}: StatusIndicatorProps): JSX.Element {
  const [actionable, setActionable] = useState(false)
  const timerRef = useRef(0)

  const handleOnClick = () => {
    if (actionable && setOpen && callback) {
      setOpen(false)

      window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(() => {
        setOpen(true)
      }, 100)

      callback()
    }
  }

  useEffect(() => {
    if (setOpen && callback) {
      setActionable(true)
    } else {
      setActionable(false)
    }
  }, [setOpen, callback])

  return (
    <div title={title} className={classNames("flex justify-center items-center", className)}>
      <span className="text-xs mr-[5px]">{title}</span>
      <button
        type="button"
        className={classNames(
          "flex justify-center items-center h-[15px] w-[15px]",
          actionable ? "cursor-pointer" : "cursor-auto",
        )}
        onClick={actionable ? handleOnClick : undefined}
      >
        <div
          className={classNames("flex rounded-full w-[10px] h-[10px]", statusOptions[status])}
        />
      </button>
    </div>
  )
}

export default StatusIndicator

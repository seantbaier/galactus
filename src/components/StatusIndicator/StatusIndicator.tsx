import { useCallback, useState, useRef, useEffect } from "react"

import { Toast } from "/@/components/Toast"
import { LOCALSTACK_VERSION, DOCKER_VERSION, useSystem, SystemConfigItemStatus } from "/@/system"

import { classNames } from "/@/utils/tailwind"

type StatusOptionsType = {
  [key: string]: string
}

const statusOptions: StatusOptionsType = {
  running: "bg-green-600",
  pending: "animate-pulse bg-yellow-900",
  failed: "bg-red-600",
}

export type FooterProps = {
  className?: string
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

function LocalstackStatus(): JSX.Element {
  const [open, setOpen] = useState(false)
  const [action, setAction] = useState<"starting" | "stopping">()

  const { localstack, startLocalstackServices, stopLocalstackServices } = useSystem()
  const loclastackStatus = localstack?.status ? localstack.status : SystemConfigItemStatus.failed

  const startLocalstack = useCallback(async () => {
    if (localstack.status === SystemConfigItemStatus.running) {
      stopLocalstackServices()
    } else {
      startLocalstackServices()
    }
  }, [startLocalstackServices, stopLocalstackServices, localstack.status])

  useEffect(() => {
    if (localstack.status === SystemConfigItemStatus.running) {
      setAction("stopping")
    } else {
      setAction("starting")
    }
  }, [localstack.status])

  const toastTitle =
    action === "starting" ? "Starting Localstack services" : "Stopping Localstack services"

  return (
    <div>
      <StatusIndicator
        title={LOCALSTACK_VERSION}
        setOpen={setOpen}
        status={loclastackStatus}
        className="mr-[20px]"
        callback={startLocalstack}
      />
      <Toast open={open} onOpenChange={setOpen} title={toastTitle} actionLabel="Dismiss" />
    </div>
  )
}

function DockerStatus(): JSX.Element {
  const [status, setStatus] = useState<SystemConfigItemStatus>(SystemConfigItemStatus.idle)

  const { localstack } = useSystem()
  const dockerStatus = localstack?.status ? localstack.status : SystemConfigItemStatus.failed

  useEffect(() => {
    setStatus(dockerStatus)
  }, [dockerStatus])

  return (
    <div>
      <StatusIndicator title={DOCKER_VERSION} status={status} className="mr-[20px]" />
    </div>
  )
}

export { StatusIndicator, DockerStatus, LocalstackStatus }

import { CheckIcon } from "@radix-ui/react-icons"

import type { StepStatus } from "./Steps"

import { classNames } from "/@/utils/tailwind"

type StatusIconProps = {
  index: number
  status: StepStatus
}

const backgroundColor = {
  done: "bg-primary-dark border border-primary-light",
  running: "bg-primary-light",
  waiting: "bg-white-main",
  failed: "bg-red-600",
}

function StatusIcon({ index, status }: StatusIconProps): JSX.Element {
  const statusIcon = {
    done: <CheckIcon className="text-primary-light" />,
    running: <span className="text-primary-white">{index}</span>,
    waiting: <div className="text-tertiary-main">{index}</div>,
    failed: <div className="text-black-dark">{index}</div>,
  }

  return (
    <div
      className={classNames(
        "flex rounded-full w-6 h-6 justify-center items-center mb-[5px] text-sm",
        backgroundColor[status],
      )}
    >
      <span
        className={classNames(
          "absolute rounded-full inline-flex justify-center items-center h-5 w-5 bg-primary-light opacity-50",
          status === "running" ? "animate-ping" : "hidden",
        )}
        aria-hidden="true"
      />
      <span
        className={classNames(
          "relative inline-flex rounded-full justify-center items-center h-4 w-4",
        )}
      >
        {statusIcon[status]}
      </span>
    </div>
  )
}

type TailProps = {
  status: StepStatus
}

function Tail({ status }: TailProps) {
  return <div className={classNames("block w-[1px] h-[25px] mb-[5px]", backgroundColor[status])} />
}

type StepIconProps = {
  last?: boolean
  status: StepStatus
  index: number
}

function StepIcon({ index, last = false, status }: StepIconProps): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-between pr-[10px]">
      <div>
        <StatusIcon index={index} status={status} />
      </div>
      {last ? null : <Tail status={status} />}
    </div>
  )
}

export default StepIcon

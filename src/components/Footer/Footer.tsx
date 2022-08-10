import { useState } from "react"

import { classNames } from "/@/utils/tailwind"

export type FooterProps = {
  className?: string
}

type StatusIndicatorProps = {
  className?: string
  title: string
  online: boolean
  onClick: () => void
}

function StatusIndicator({ title, online, onClick, className = "" }: StatusIndicatorProps) {
  return (
    <div className={classNames("flex justify-center items-center", className)}>
      <span className="text-xs mr-[5px]">{title}</span>
      <button
        type="button"
        className={classNames("flex justify-center items-center h-[15px] w-[15px]")}
        onClick={onClick}
      >
        <div
          className={classNames(
            "flex rounded-full w-[10px] h-[10px]",
            online ? "bg-green-600" : "bg-red-600",
          )}
        />
      </button>
    </div>
  )
}

function LocalstackStatus() {
  const [online, setOnline] = useState(true)

  const toggleOnline = () => setOnline(!online)

  return (
    <StatusIndicator
      title="Localstack v1.14.4"
      onClick={toggleOnline}
      online={online}
      className="mr-[20px]"
    />
  )
}

function DockerStatus() {
  const [online, setOnline] = useState(true)

  const toggleOnline = () => setOnline(!online)

  return <StatusIndicator title="Docker v20.10.14" onClick={toggleOnline} online={online} />
}

function Footer({ className = "" }: FooterProps): JSX.Element {
  return (
    <div
      id="footer"
      className={classNames(
        "fixed bottom-0 left-0 flex justify-end items-center w-full h-[30px] bg-black-main border-t border-black-dark px-[10px]",
        className,
      )}
    >
      <LocalstackStatus />
      <DockerStatus />
    </div>
  )
}

export default Footer

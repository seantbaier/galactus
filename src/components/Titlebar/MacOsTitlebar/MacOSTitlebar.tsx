import { useState } from "react"
import { StatusOfflineIcon, StatusOnlineIcon } from "@heroicons/react/outline"

// Components
import MacOSTitleButtons from "./MacOSTitlebarButtons"

// Constants
import { TITLEBAR_HEIGHT, TITLEBAR_CONTAINER_LENGTH } from "/@/constants/layout"
import { PROJECT_NAME } from "/@/constants/project"
import { classNames } from "/@/utils/tailwind"

function ProjectTitle(): JSX.Element {
  return (
    <div
      className={classNames(
        "self-center justify-self-center text-sm text-white-main font-sans",
        TITLEBAR_CONTAINER_LENGTH,
      )}
    >
      {PROJECT_NAME}
    </div>
  )
}

function OnlineStatusIndicator() {
  const [online, setOnline] = useState(true)

  const toggleOnline = () => setOnline(!online)
  return (
    <div
      className={classNames(
        "flex justify-center items-center",
        TITLEBAR_HEIGHT,
        TITLEBAR_CONTAINER_LENGTH,
      )}
    >
      <button
        className={classNames("flex justify-center items-center")}
        onClick={toggleOnline}
        type="button"
        aria-describedby="Online status indicator"
        title="Online status"
      >
        {online ? (
          <StatusOnlineIcon className="h-[15px] w-[15px] text-green-600" />
        ) : (
          <StatusOfflineIcon className="h-[15px] w-[15px] text-red-900" />
        )}
      </button>
    </div>
  )
}

type MacOSTitlebarProps = {
  className?: string
}

function MacOSTitlebar({ className = "" }: MacOSTitlebarProps): JSX.Element {
  return (
    <div
      data-tauri-drag-region
      className={classNames(
        "flex justify-between w-full pl-[10px] top-0 left-0 fixed bg-black-main border-b border-black-dark",
        TITLEBAR_HEIGHT,
        className,
      )}
    >
      <MacOSTitleButtons />
      <ProjectTitle />
      <OnlineStatusIndicator />
    </div>
  )
}

export default MacOSTitlebar

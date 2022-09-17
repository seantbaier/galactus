import { useState } from "react"
import { SignalSlashIcon, SignalIcon } from "/@/components/Icons"

// Constants
import { TITLEBAR_HEIGHT, TITLEBAR_CONTAINER_LENGTH } from "/@/constants/layout"
import { classNames } from "/@/utils/tailwind"

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
          <SignalIcon className="h-[15px] w-[15px] text-green-600" />
        ) : (
          <SignalSlashIcon className="h-[15px] w-[15px] text-red-900" />
        )}
      </button>
    </div>
  )
}

export default OnlineStatusIndicator

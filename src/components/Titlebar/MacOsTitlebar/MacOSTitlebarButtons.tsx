import React from "react"
import { appWindow } from "@tauri-apps/api/window"
import { Cross2Icon, MinusIcon, SizeIcon } from "@radix-ui/react-icons"

// Components
import MacOSTitlebarButton from "./MacOSTitlebarButton"

// Constants
import { classNames } from "/@/utils/tailwind"
import { TITLEBAR_CONTAINER_LENGTH } from "/@/constants/layout"

import type { MacOSTitleButtonActions } from "./MacOSTitlebarButton"

const ICON_SIZE = "w-[8px] h-[8px]"

type TitleButton = {
  icon: React.ReactNode
  action: MacOSTitleButtonActions
  color: string
}

const titleButtonsConfig: TitleButton[] = [
  {
    icon: <Cross2Icon className={classNames(ICON_SIZE)} />,
    action: "close",
    color: "bg-close-main",
  },
  {
    icon: <MinusIcon className={classNames(ICON_SIZE)} />,
    action: "minimize",
    color: "bg-minimize-main",
  },
  {
    icon: <SizeIcon className={classNames(ICON_SIZE, "rotate-90")} />,
    action: "maximize",
    color: "bg-maximize-main",
  },
]

function MacOSTitlebarButtons(): JSX.Element {
  const handleMinimizeWindow = () => appWindow.minimize()
  const handleMaximizeWindow = () => appWindow.maximize()
  const handleCloseWindow = () => appWindow.close()

  const handleOnClick = (action: MacOSTitleButtonActions) => {
    return {
      close: handleCloseWindow,
      minimize: handleMinimizeWindow,
      maximize: handleMaximizeWindow,
    }[action]
  }

  return (
    <div
      className={classNames("group flex justify-between items-center", TITLEBAR_CONTAINER_LENGTH)}
    >
      {titleButtonsConfig.map(item => {
        const { action, icon, color } = item
        return (
          <MacOSTitlebarButton key={action} onClick={() => handleOnClick(action)} color={color}>
            <div className="invisible group-hover:visible">{icon}</div>
          </MacOSTitlebarButton>
        )
      })}
    </div>
  )
}

export default MacOSTitlebarButtons

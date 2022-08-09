import React from "react"

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

      {/* Spacer */}
      <div className={classNames(TITLEBAR_HEIGHT, TITLEBAR_CONTAINER_LENGTH)} />
    </div>
  )
}

export default MacOSTitlebar

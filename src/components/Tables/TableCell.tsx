import React from "react"

import { classNames } from "/@/utils/tailwind"
import { BODY_CELL_PADDING } from "./constants"

type TableCellProps = {
  children: React.ReactNode
  className?: string
  end?: boolean
  start?: boolean
}

function TableCell({ children, start = false, end = false, className = "" }: TableCellProps) {
  const centered = start ? "justify-start" : "justify-center"
  const alignment = end ? "justify-end" : centered

  return (
    <td
      className={classNames(
        className,
        BODY_CELL_PADDING,
        "first-of-type:pl-4 min-w-[50px] text-xs",
        alignment,
      )}
    >
      {children}
    </td>
  )
}

export default TableCell

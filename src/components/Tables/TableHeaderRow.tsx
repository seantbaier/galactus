import { flexRender } from "@tanstack/react-table"

import { classNames } from "/@/utils/tailwind"
import { HEADER_CELL_PADDING } from "./constants"

type TableHeaderCellProps = {
  children: React.ReactNode
  className?: string
}

export function TableHeaderCell({ children, className = "" }: TableHeaderCellProps) {
  return (
    <td
      className={classNames(
        "first-of-type:rounded-tl-lg first-of-type:pl-4 last-of-type:rounded-tr-lg",
        "font-normal text-white-main text-xs text-left",
        HEADER_CELL_PADDING,
        className,
      )}
    >
      {children}
    </td>
  )
}

type TableHeaderRowProps = {
  headerGroup: any
  className?: string
}

function TableHeaderRow({ headerGroup, className = "" }: TableHeaderRowProps): JSX.Element {
  return (
    <tr key={headerGroup.id} className={classNames("border-b border-white-light", className)}>
      {headerGroup.headers.map((header: any) => (
        <TableHeaderCell key={header.id}>
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </TableHeaderCell>
      ))}
    </tr>
  )
}

export default TableHeaderRow

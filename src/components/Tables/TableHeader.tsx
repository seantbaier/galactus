import { flexRender, Table as ReactTable } from "@tanstack/react-table"

import { classNames } from "/@/utils/tailwind"
import { CELL_PADDING } from "./constants"

type TableHeaderCellProps = {
  children: React.ReactNode
  className?: string
}

export function TableHeaderCell({ children, className = "" }: TableHeaderCellProps) {
  return (
    <td
      className={classNames(
        "font-normal text-white-main text-xs text-left",
        CELL_PADDING,
        className,
      )}
    >
      {children}
    </td>
  )
}

type TableHeaderRowProps = {
  headerGroup: any
}

function TableHeaderRow({ headerGroup }: TableHeaderRowProps): JSX.Element {
  return (
    <tr key={headerGroup.id} className="border-b border-white-light">
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

type TableHeaderProps<TData> = {
  table: ReactTable<TData>
}

function TableHeader<TData>({ table }: TableHeaderProps<TData>): JSX.Element {
  return (
    <thead>
      {table.getHeaderGroups().map(headerGroup => (
        <TableHeaderRow key={headerGroup.id} headerGroup={headerGroup} />
      ))}
    </thead>
  )
}

export default TableHeader

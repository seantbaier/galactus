import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import React from "react"
import { useNavigate } from "react-router-dom"

import { classNames } from "/@/utils/tailwind"
import { CELL_PADDING } from "./constants"

type TableCellProps = {
  children: React.ReactNode
  className?: string
  end?: boolean
  start?: boolean
}

export function TableCell({
  children,
  start = false,
  end = false,
  className = "",
}: TableCellProps) {
  const centered = start ? "justify-start" : "justify-center"
  const alignment = end ? "justify-end" : centered

  return (
    <td className={classNames(className, CELL_PADDING, "min-w-[50px] text-xs", alignment)}>
      {children}
    </td>
  )
}

type TableRowProps = {
  row: any
}

function TableRow({ row }: TableRowProps): JSX.Element {
  const navigate = useNavigate()

  const onClick = (apiId: any) => navigate(apiId)

  return (
    <tr
      key={row.id}
      className="w-full border-b border-white-light"
      onClick={() => onClick(row.original.apiId)}
    >
      {row.getVisibleCells().map((cell: any) => {
        const cellStyles =
          cell.column.columnDef.accessorKey === "delete" ? "inline-flex w-full" : ""

        return (
          <TableCell key={cell.id} className={cellStyles} end>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        )
      })}
    </tr>
  )
}

type TableBodyProps<TData> = {
  data: TData[]
  columns: any[]
}

function TableBody<TData>({ data = [], columns = [] }: TableBodyProps<TData>): JSX.Element {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <tbody>
      {table.getRowModel().rows.map(row => (
        <TableRow key={row.id} row={row} />
      ))}
    </tbody>
  )
}

export default TableBody

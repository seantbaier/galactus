import { flexRender } from "@tanstack/react-table"

import TableCell from "./TableCell"

type TableRowProps = {
  row: any
}

function TableRow({ row }: TableRowProps): JSX.Element {
  return (
    <tr key={row.id} className="w-full bg-black-main border-b border-white-light">
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

export default TableRow

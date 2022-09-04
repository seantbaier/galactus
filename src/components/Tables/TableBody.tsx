import { getCoreRowModel, useReactTable } from "@tanstack/react-table"

import TableRow from "./TableRow"

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

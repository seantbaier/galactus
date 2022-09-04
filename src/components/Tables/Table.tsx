import { getCoreRowModel, useReactTable } from "@tanstack/react-table"

import TableHeader from "./TableHeader"
import TableBody from "./TableBody"

type TableProps<TData> = {
  data: TData[]
  columns: any[]
}

function Table<TData>({ data = [], columns = [] }: TableProps<TData>): JSX.Element {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-lg bg-black-dark px-4 py-2 mb-2">
      <table className="mb-2 w-full">
        <TableHeader table={table} />
        <TableBody data={data} columns={columns} />
      </table>
    </div>
  )
}

export default Table

import { createColumnHelper, useReactTable, getCoreRowModel } from "@tanstack/react-table"
import { Link } from "react-router-dom"
import { TrashIcon } from "@radix-ui/react-icons"

import { TableRow, TableHeaderRow, TableFooterRow } from "/@/components/Tables"
import { useDescribeDBInstances, useDeleteDBInstance } from "/@/hooks/useRDS"
import { getOriginal } from "/@/utils/reactTable"
import { DeleteDBInstanceCommandInput } from "@aws-sdk/client-rds"

function RDSDBInstanceTable(): JSX.Element {
  const { data } = useDescribeDBInstances({})
  const { DBInstances: dbInstances = [] } = data || {}
  console.log("instances", dbInstances)

  const deleteDBInstanceMutation = useDeleteDBInstance()

  const onDelete = (DBInstanceIdentifier: string) =>
    deleteDBInstanceMutation.mutate({ DBInstanceIdentifier })

  const renderDeleteIcon = (info: any) => {
    return (
      <button
        className="flex justify-end"
        onClick={() => onDelete(getOriginal(info)?.DBInstanceIdentifier)}
        type="button"
      >
        <TrashIcon className="text-red-700" />
      </button>
    )
  }

  const renderNameCell = (info: any) => (
    <Link to="/" className="text-primary-light">
      {info.renderValue()}
    </Link>
  )

  const columnHelper = createColumnHelper<any>()
  const clusterColumns = [
    columnHelper.accessor("DBName", {
      header: () => "Name",
      cell: info => renderNameCell(info),
      footer: info => info.column.id,
    }),
    columnHelper.accessor("DBInstanceClass", {
      header: () => "Instance Class",
      cell: info => info.getValue(),
      footer: info => info.column.id,
    }),
    columnHelper.accessor("DBInstanceArn", {
      header: "Instance Arn",
      footer: info => info.column.id,
    }),
    columnHelper.accessor("DBInstanceStatus", {
      header: "Status",
      footer: info => info.column.id,
    }),
    columnHelper.accessor("delete", {
      header: "",
      cell: (info: any) => renderDeleteIcon(info),
      footer: info => info.column.id,
    }),
  ]

  const table = useReactTable({
    data: dbInstances,
    columns: clusterColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className="mb-2 w-full rounded-xl h-full">
      <thead className="bg-black-main rounded-tl-lg rounded-tr-lg">
        {table.getHeaderGroups().map(headerGroup => (
          <TableHeaderRow key={headerGroup.id} headerGroup={headerGroup} />
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <TableRow key={row.id} row={row} />
        ))}
      </tbody>
      <tfoot className="rounded-bl-lg rounded-br-lg bg-black-main">
        {table.getFooterGroups().map(footerGroup => (
          <TableFooterRow key={footerGroup.id} footerGroup={footerGroup} />
        ))}
      </tfoot>
    </table>
  )
}

export default RDSDBInstanceTable

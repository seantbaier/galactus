import { createColumnHelper, useReactTable, getCoreRowModel } from "@tanstack/react-table"
import { Link } from "react-router-dom"
import { TrashIcon } from "@radix-ui/react-icons"
import { TableDescription } from "@aws-sdk/client-dynamodb"

import { TableRow, TableHeaderRow, TableFooterRow } from "/@/components/Tables"
import { useListDynamodbTables, useDeleteDynamodbTable } from "/@/hooks/useDynamodb"
import { DYNAMODB_PATH } from "/@/constants/routes"
import { getOriginal } from "/@/utils/reactTable"

function DynamodbTablesTable(): JSX.Element {
  const { data } = useListDynamodbTables()
  const { TableNames: tableNames = [] } = data || {}
  console.log("tableNames", tableNames)

  const deleteDynamodbTable = useDeleteDynamodbTable()

  const onDelete = (tableName: any) => deleteDynamodbTable.mutate(tableName)

  const renderDeleteIcon = (info: any) => (
    <button
      className="flex justify-end"
      onClick={() => onDelete(getOriginal(info)?.apiId)}
      type="button"
    >
      <TrashIcon className="text-red-700" />
    </button>
  )

  const renderNameCell = (info: any) => {
    const tableName = getOriginal(info)
    return (
      <Link to={`${DYNAMODB_PATH}/${tableName}`} className="text-primary-light">
        {tableName}
      </Link>
    )
  }

  const columnHelper = createColumnHelper<any>()
  const columns = [
    columnHelper.accessor("name", {
      header: () => "Table Name",
      cell: info => renderNameCell(info),
      footer: info => info.column.id,
    }),
    columnHelper.accessor("delete", {
      header: "",
      cell: (info: any) => renderDeleteIcon(info),
      footer: info => info.column.id,
    }),
  ]

  //   const tableDescriptions: TableDescription[] = tableNames.map(name => {
  //     return { TableName: name }
  //   })
  const table = useReactTable({
    data: tableNames,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className="mb-2 w-full rounded-xl">
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

export default DynamodbTablesTable

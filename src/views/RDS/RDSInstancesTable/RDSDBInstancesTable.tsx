import { useReducer, useState } from "react"
import { createColumnHelper, useReactTable, getCoreRowModel } from "@tanstack/react-table"
import { Link } from "react-router-dom"
import { TrashIcon } from "@radix-ui/react-icons"

import { TableRow, TableHeaderRow, TableFooterRow } from "/@/components/Tables"
import { useDeleteDBInstance } from "/@/hooks/useRDS"
import { getOriginal } from "/@/utils/reactTable"
import { DBInstance } from "@aws-sdk/client-rds"
import RDSDBInstanceEmptyTable from "./RDSDBInstanceEmptyTable"
import { UpdateIcon } from "/@/components/Icons"
import { Button } from "/@/components/Buttons"
import RDSDBInstanceForm from "../RDSForms/RDSForms/RDSDBInstanceForm"

type RDSDBInstancesTableProps = {
  items?: DBInstance[]
}

export function RDSDBInstancesTable({ items = [] }: RDSDBInstancesTableProps): JSX.Element {
  const [showForm, setShowForm] = useState<boolean>(false)

  const rerender = useReducer(() => ({}), {})[1]

  const deleteDBInstanceMutation = useDeleteDBInstance()

  const onDelete = (DBInstanceIdentifier: string) =>
    deleteDBInstanceMutation.mutate({ DBInstanceIdentifier })

  const onCreate = () => {
    setShowForm(true)
  }

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
    data: items,
    columns: clusterColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-2">
      {showForm ? <RDSDBInstanceForm open={showForm} setOpen={setShowForm} /> : null}

      {/* Header */}
      <div className="flex justify-between items-end mb-2">
        <div className="flex justify-left items-center">
          <h2 className="text-sm mr-4">Refresh</h2>
          <button onClick={() => rerender()} className="text-primary-light" type="button">
            <UpdateIcon />
          </button>
        </div>

        <Button text="Create" onClick={onCreate} />
      </div>

      {/* Table */}
      {items.length > 0 ? (
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
      ) : (
        <RDSDBInstanceEmptyTable onCreate={onCreate} />
      )}
    </div>
  )
}

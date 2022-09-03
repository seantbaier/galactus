import { useReducer } from "react"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { TrashIcon, UpdateIcon } from "@radix-ui/react-icons"
import { CreateTableCommandInput } from "@aws-sdk/client-dynamodb"
import {
  CreateGraphqlApiCommandInput,
  DeleteGraphqlApiCommandInput,
  GraphqlApi,
} from "@aws-sdk/client-appsync"

import { dataProvider } from "/@/providers"
import { classNames } from "/@/utils/tailwind"
import { useCreateDynamodbTable, useListDynamodbTables } from "/@/hooks/useDynamodb"

type DynamodbTableWidgetProps = {
  className?: string
}

function DynamodbTableWidget({ className = "" }: DynamodbTableWidgetProps): JSX.Element {
  const rerender = useReducer(() => ({}), {})[1]
  const { data: tables = [] } = useListDynamodbTables()
  console.log("tables", tables)

  const createTableMutation = useCreateDynamodbTable()

  const onCreate = () => {
    const tableName = "expenses"
    const project = "buckets"
    const stage = "local"

    const commandInput: CreateTableCommandInput = {
      AttributeDefinitions: [
        { AttributeName: "PK", AttributeType: "S" },
        { AttributeName: "SK", AttributeType: "S" },
      ],
      TableName: `${project}-${tableName}-${stage}`,
      KeySchema: [
        { AttributeName: "PK", KeyType: "HASH" },
        { AttributeName: "SK", KeyType: "RANGE" },
      ],
      BillingMode: "PAY_PER_REQUEST",
      //   LocalSecondaryIndexes: input.LocalSecondaryIndexes, ?
      //   GlobalSecondaryIndexes: input.GlobalSecondaryIndexes,
      //   ProvisionedThroughput: input.ProvisionedThroughput,
      //   StreamSpecification: input.StreamSpecification,
      //   SSESpecification: input.SSESpecification,
      //   Tags: input.Tags,
      //   TableClass: input.TableClass,
    }

    createTableMutation.mutate(commandInput)
  }

  const onDelete = (info: any) => {
    console.log("delete")
  }

  const columnHelper = createColumnHelper<any>()

  const renderDeleteIcon = (info: any) => {
    return (
      <button className="flex justify-end" onClick={() => onDelete(info)} type="button">
        <TrashIcon className="text-red-900" />
      </button>
    )
  }

  const appSyncColumns = [
    columnHelper.accessor("TableName", {
      header: () => "Table Name",
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor("ItemCount", {
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("delete", {
      header: "",
      cell: (info: any) => renderDeleteIcon(info),
    }),
  ]

  const table = useReactTable({
    data: [],
    columns: appSyncColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className={classNames("my-6", className)}>
      <div className="flex items-center mb-2">
        <h2 className="text-lg mr-4">Dynamodb</h2>

        <button onClick={rerender} className="text-primary-light" type="button">
          <UpdateIcon />
        </button>
      </div>

      <div className="rounded-lg bg-black-dark px-4 py-2 mb-2">
        <table className="mb-2 w-full">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="border-b border-white-light">
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="py-2 font-normal text-white-main text-xs text-left"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-b border-white-light">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="min-w-[50px] py-2 text-xs pr-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center">
          <button
            onClick={onCreate}
            className={classNames(
              "text-xs px-6 py-2 rounded-3xl bg-black-main font-semibold text-white-main border-4 border-primary-light",
            )}
            type="button"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

export default DynamodbTableWidget

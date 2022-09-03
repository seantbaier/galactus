import { useReducer } from "react"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { TrashIcon } from "@radix-ui/react-icons"
import { DeleteGraphqlApiCommandInput, GraphqlApi } from "@aws-sdk/client-appsync"

import { dataProvider } from "/@/providers"

type TableWidgetProps = {
  items: any[]
}

function TableWidget({ items = [] }: TableWidgetProps): JSX.Element {
  const rerender = useReducer(() => ({}), {})[1]

  const queryClient = useQueryClient()
  const deleteGraphqlApi = useMutation(
    (apiId: DeleteGraphqlApiCommandInput) => dataProvider.appsync.deleteGraphqlApi(apiId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["graphqlApis"])
      },
    },
  )

  const onDelete = (info: any) => {
    const {
      cell: {
        row: { original },
      },
    } = info
    const apiId = original?.apiId
    deleteGraphqlApi.mutate({ apiId })
  }

  const columnHelper = createColumnHelper<GraphqlApi>()

  const renderAuthType = () => <span>Auth Type</span>

  const renderDeleteIcon = (info: any) => {
    return (
      <button className="flex justify-end" onClick={() => onDelete(info)} type="button">
        <TrashIcon className="text-red-900" />
      </button>
    )
  }

  const appSyncColumns = [
    columnHelper.accessor("name", {
      header: () => "Name",
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor("apiId", {
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("authenticationType", {
      header: renderAuthType,
    }),
    columnHelper.accessor(row => row?.uris?.GRAPHQL, {
      id: "Graphql Url",
      header: "Graphql Url",
    }),
    columnHelper.accessor("delete", {
      header: "",
      cell: (info: any) => renderDeleteIcon(info),
    }),
  ]

  const table = useReactTable({
    data: items,
    columns: appSyncColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-lg bg-black-dark px-4 py-2">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="border-b border-white-light">
              {headerGroup.headers.map(header => (
                <th key={header.id} className="py-2 font-normal text-white-main text-xs text-left">
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
      <button
        onClick={() => rerender()}
        className="pl-2 pb-2 text-xs font-normal rounded-md text-primary-light"
        type="button"
      >
        Refresh
      </button>
    </div>
  )
}

export default TableWidget

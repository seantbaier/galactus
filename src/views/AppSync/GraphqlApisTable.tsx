import {
  flexRender,
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table"
import { Link } from "react-router-dom"
import { TrashIcon } from "@radix-ui/react-icons"
import { GraphqlApi } from "@aws-sdk/client-appsync"

import { TableRow, TableHeaderRow, TableFooterRow } from "/@/components/Tables"
import { useListGraphqlApis, useDeleteGraphqlApi } from "/@/hooks/useAppSync"
import { APPSYNC_PATH } from "/@/constants/routes"

const getOriginal = (info: any) => {
  const {
    row: { original },
  } = info
  return original
}

function GraphqlApisTable(): JSX.Element {
  const { data } = useListGraphqlApis()
  const { graphqlApis = [] } = data || {}

  const deleteGraphqlApi = useDeleteGraphqlApi()

  const onDelete = (apiId: any) => deleteGraphqlApi.mutate({ apiId })

  const renderAuthType = () => <span>Auth Type</span>

  const renderDeleteIcon = (info: any) => (
    <button
      className="flex justify-end"
      onClick={() => onDelete(getOriginal(info)?.apiId)}
      type="button"
    >
      <TrashIcon className="text-red-700" />
    </button>
  )

  const renderNameCell = (info: any) => (
    <Link to={`${APPSYNC_PATH}/${getOriginal(info).apiId}`} className="text-primary-light">
      {info.renderValue()}
    </Link>
  )

  const columnHelper = createColumnHelper<GraphqlApi>()
  const appSyncColumns = [
    columnHelper.accessor("name", {
      header: () => "Name",
      cell: info => renderNameCell(info),
      footer: info => {
        console.log(info)
        return info.column.id
      },
    }),
    columnHelper.accessor("apiId", {
      header: () => "API ID",
      cell: info => info.getValue(),
      footer: info => info.column.id,
    }),
    columnHelper.accessor("authenticationType", {
      header: renderAuthType,
      footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row?.uris?.GRAPHQL, {
      id: "Graphql Url",
      header: "Graphql Url",
      footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row?.uris?.REALTIME, {
      id: "WS Url",
      header: "WS Url",
      footer: info => info.column.id,
    }),
    columnHelper.accessor("delete", {
      header: "",
      cell: (info: any) => renderDeleteIcon(info),
      footer: info => info.column.id,
    }),
  ]

  const table = useReactTable({
    data: graphqlApis,
    columns: appSyncColumns,
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

export default GraphqlApisTable

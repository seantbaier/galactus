import { useReducer } from "react"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { TrashIcon, UpdateIcon } from "@radix-ui/react-icons"
import {
  CreateGraphqlApiCommandInput,
  DeleteGraphqlApiCommandInput,
  GraphqlApi,
} from "@aws-sdk/client-appsync"

import { dataProvider } from "/@/providers"
import { classNames } from "/@/utils/tailwind"

type TableWidgetProps = {
  items: any[]
}

function AppSyncTableWidget({ items = [] }: TableWidgetProps): JSX.Element {
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

  const mutation = useMutation(dataProvider.appsync.createGraphqlApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(["graphqlApis"])
    },
  })

  const handleOnClick = () => {
    const commandInput: CreateGraphqlApiCommandInput = {
      name: "local-appsync-api",
      authenticationType: "API_KEY",
      //       // logConfig: input.logConfig,
      //       // userPoolConfig: input.userPoolConfig,
      //       // openIDConnectConfig: input.openIDConnectConfig,
      //       // tags: input.tags,
      //       // additionalAuthenticationProviders: input.additionalAuthenticationProviders,
      //       // xrayEnabled: input.xrayEnabled,
      //       // lambdaAuthorizerConfig: input.lambdaAuthorizerConfig,
    }

    mutation.mutate(commandInput)
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
    <div>
      <div className="flex items-center mb-2">
        <h2 className="text-lg mr-4">AppSync Graphql API</h2>

        <button onClick={() => rerender()} className="text-primary-light" type="button">
          <UpdateIcon />
        </button>
      </div>

      <div className="rounded-lg bg-black-dark px-4 py-2 mb-2">
        <table className="mb-2">
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
            onClick={handleOnClick}
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

export default AppSyncTableWidget

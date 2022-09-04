import { useReducer } from "react"
import { createColumnHelper } from "@tanstack/react-table"
import { TrashIcon, UpdateIcon } from "@radix-ui/react-icons"
import { CreateGraphqlApiCommandInput, GraphqlApi } from "@aws-sdk/client-appsync"

import { classNames } from "/@/utils/tailwind"
import { Table } from "/@/components/Tables"
import { useListGraphqlApis, useDeleteGraphqlApi, useCreateGraphqlApi } from "/@/hooks/useAppSync"

type TableWidgetProps = {
  className?: string
}

function GraphqlApis({ className = "" }: TableWidgetProps): JSX.Element {
  const rerender = useReducer(() => ({}), {})[1]

  const { data } = useListGraphqlApis()
  const { graphqlApis = [] } = data || {}

  const deleteGraphqlApi = useDeleteGraphqlApi()
  const createGraphqlApi = useCreateGraphqlApi()

  const onDelete = (apiId: any) => deleteGraphqlApi.mutate({ apiId })

  const handleOnClick = (input: any) => {
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

    createGraphqlApi.mutate(commandInput)
  }

  const columnHelper = createColumnHelper<GraphqlApi>()

  const renderAuthType = () => <span>Auth Type</span>

  const renderDeleteIcon = (info: any) => {
    const {
      row: { original },
    } = info

    return (
      <button className="flex justify-end" onClick={() => onDelete(original?.apiId)} type="button">
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
      header: () => "API ID",
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

  return (
    <div className={classNames("my-6", className)}>
      <div className="flex items-center mb-2">
        <h2 className="text-lg mr-4">Graphql APIs</h2>

        <button onClick={() => rerender()} className="text-primary-light" type="button">
          <UpdateIcon />
        </button>
      </div>

      <Table data={graphqlApis} columns={appSyncColumns} />
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
  )
}

export default GraphqlApis

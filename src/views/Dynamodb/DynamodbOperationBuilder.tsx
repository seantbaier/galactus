import { useReducer } from "react"
import { useParams } from "react-router-dom"
import { UpdateIcon } from "/@/components/Icons"
import { CreateGraphqlApiCommandInput } from "@aws-sdk/client-appsync"

import { classNames } from "/@/utils/tailwind"
import DynamodbTablesTable from "./DynamodbTablesTable"
import { useCreateGraphqlApi } from "/@/hooks/useAppSync"

type TableWidgetProps = {
  className?: string
}

function DynamodbOperationBuilder({ className = "" }: TableWidgetProps): JSX.Element {
  const rerender = useReducer(() => ({}), {})[1]
  const params = useParams()
  console.log("params", params)

  const createGraphqlApi = useCreateGraphqlApi()

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

  return (
    <div className={classNames("my-6 w-[100%]", className)}>
      <div className="flex items-center mb-2">
        <h2 className="text-lg mr-4">Tables</h2>

        <button onClick={() => rerender()} className="text-primary-light" type="button">
          <UpdateIcon />
        </button>
      </div>

      <DynamodbTablesTable />
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

export default DynamodbOperationBuilder

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"

import { dataProvider } from "/@/providers"
import { classNames } from "/@/utils/tailwind"
import { CreateGraphqlApiCommandInput } from "@aws-sdk/client-appsync"

function Home(): JSX.Element {
  const queryClient = useQueryClient()
  const { data: apis } = useQuery(["graphqlApis"], () => dataProvider.appsync.listGraphqlApis())

  const mutation = useMutation(dataProvider.appsync.createGraphqlApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(["graphqlApis"])
    },
  })

  const handleOnClick = () => {
    const commandInput: CreateGraphqlApiCommandInput = {
      name: "local-appsync-api",
      //       // logConfig: input.logConfig,
      authenticationType: "API_KEY",
      //       // userPoolConfig: input.userPoolConfig,
      //       // openIDConnectConfig: input.openIDConnectConfig,
      //       // tags: input.tags,
      //       // additionalAuthenticationProviders: input.additionalAuthenticationProviders,
      //       // xrayEnabled: input.xrayEnabled,
      //       // lambdaAuthorizerConfig: input.lambdaAuthorizerConfig,
      //     }
    }

    mutation.mutate(commandInput)
  }

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-xl mb-4">Dashboard</h1>
        <h2 className="text-lg">AppSync Graphql API</h2>
      </div>
      <button
        onClick={handleOnClick}
        className={classNames(
          "px-6 py-2 rounded-3xl bg-black-main font-semibold text-white-main border-4 border-primary-light",
        )}
        type="button"
      >
        Create
      </button>
    </div>
  )
}

export default Home

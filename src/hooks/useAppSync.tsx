import {
  CreateGraphqlApiCommandInput,
  DeleteGraphqlApiCommandInput,
} from "@aws-sdk/client-appsync"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { dataProvider } from "/@/providers"
import { APPSYNC_QUERY_KEY, APPSYNC_GRAPHQLAPIS_KEY } from "./constants"

export const useListGraphqlApis = () =>
  useQuery([APPSYNC_QUERY_KEY, APPSYNC_GRAPHQLAPIS_KEY], async () =>
    dataProvider.appsync.listGraphqlApis(),
  )

export const useCreateGraphqlApi = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (input: CreateGraphqlApiCommandInput) => dataProvider.appsync.createGraphqlApi(input),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([APPSYNC_QUERY_KEY, APPSYNC_GRAPHQLAPIS_KEY])
      },
    },
  )
}

export const useDeleteGraphqlApi = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (input: DeleteGraphqlApiCommandInput) => dataProvider.appsync.deleteGraphqlApi(input),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([APPSYNC_QUERY_KEY, APPSYNC_GRAPHQLAPIS_KEY])
      },
    },
  )
}

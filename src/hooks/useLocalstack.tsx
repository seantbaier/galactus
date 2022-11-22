import {
  useQuery,
  useQueryClient,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query"

import { dataProvider } from "/@/providers"
import { LOCALSTACK_INSTALLED_COMMAND, LOCALSTACK_SUCCESS_RESPONSE } from "/@/constants/system"
import { LocalStackStatusResponse } from "/@/providers/localstackProvider"
import { LOCALSTACK_QUERY_KEY, LOCALSTACK_STATUS_KEY } from "/@/hooks/constants"

export interface UseLocalstackInterface {
  isRunning: boolean | undefined
  startLocalstackServices: UseMutationResult
}

export const useStartLocalStackServicesMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(dataProvider.localstack.startLocalstackServices, {
    onSuccess: () => {
      queryClient.invalidateQueries([LOCALSTACK_QUERY_KEY, LOCALSTACK_STATUS_KEY])
    },
  })
}

export const useStopLocalStackServicesMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(dataProvider.localstack.stopLocalstackServices, {
    onSuccess: () => {
      queryClient.invalidateQueries([LOCALSTACK_QUERY_KEY, LOCALSTACK_STATUS_KEY])
    },
  })
}

export const useLocalstackStatusQuery = (): UseQueryResult<LocalStackStatusResponse> =>
  useQuery([LOCALSTACK_QUERY_KEY, LOCALSTACK_STATUS_KEY], async () =>
    dataProvider.localstack.localstackStatus(),
  )

export const useLocalstackInstalledQuery = () => {
  return useQuery([LOCALSTACK_QUERY_KEY, LOCALSTACK_INSTALLED_COMMAND], async () => {
    const response = await dataProvider.localstack.installationCheck()
    return response === LOCALSTACK_SUCCESS_RESPONSE
  })
}

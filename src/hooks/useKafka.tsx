import {
  CreateClusterCommandInput,
  DeleteClusterCommandInput,
  ListClustersCommandInput,
} from "@aws-sdk/client-kafka"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { dataProvider } from "/@/providers"
import { KAFKA_QUERY_KEY, KAFKA_CLUSTERS_KEY } from "./constants"

export const useListClusters = (input: ListClustersCommandInput) =>
  useQuery([KAFKA_QUERY_KEY, KAFKA_CLUSTERS_KEY], async () =>
    dataProvider.kafka.listClusters(input),
  )

export const useCreateCluster = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (input: CreateClusterCommandInput) => dataProvider.kafka.createCluster(input),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([KAFKA_QUERY_KEY, KAFKA_CLUSTERS_KEY])
      },
    },
  )
}

export const useDeleteCluster = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (input: DeleteClusterCommandInput) => dataProvider.kafka.deleteCluster(input),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([KAFKA_QUERY_KEY, KAFKA_CLUSTERS_KEY])
      },
    },
  )
}

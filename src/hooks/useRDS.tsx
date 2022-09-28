import {
  CreateDBInstanceCommandInput,
  DeleteDBInstanceCommandInput,
  DescribeDBInstancesCommandInput,
} from "@aws-sdk/client-rds"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { dataProvider } from "/@/providers"
import { RDS_INSTANCES_KEY, RDS_QUERY_KEY } from "./constants"

export const useDescribeDBInstances = (input: DescribeDBInstancesCommandInput) =>
  useQuery([RDS_QUERY_KEY, RDS_INSTANCES_KEY], async () =>
    dataProvider.rds.describeDbInstances(input),
  )

export const useCreateDBInstance = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (input: CreateDBInstanceCommandInput) => dataProvider.rds.createDbInstance(input),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([RDS_QUERY_KEY, RDS_INSTANCES_KEY])
      },
    },
  )
}

export const useDeleteDBInstance = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (input: DeleteDBInstanceCommandInput) => dataProvider.rds.deleteDbInstance(input),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([RDS_QUERY_KEY, RDS_INSTANCES_KEY])
      },
    },
  )
}

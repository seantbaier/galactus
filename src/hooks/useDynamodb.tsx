import { CreateTableCommandInput, DeleteTableCommandInput } from "@aws-sdk/client-dynamodb"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { dataProvider } from "/@/providers"
import { DYNAMODB_QUERY_KEY, DYNAMODB_TABLES_KEY } from "./constants"

export const useListDynamodbTables = () =>
  useQuery([DYNAMODB_QUERY_KEY, DYNAMODB_TABLES_KEY], async () =>
    dataProvider.dynamodb.listTables(),
  )

export const useCreateDynamodbTable = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (input: CreateTableCommandInput) => dataProvider.dynamodb.createTable(input),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([DYNAMODB_QUERY_KEY, DYNAMODB_TABLES_KEY])
      },
    },
  )
}

export const useDeleteDynamodbTable = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (input: DeleteTableCommandInput) => dataProvider.dynamodb.deleteDynamodbTable(input),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([DYNAMODB_QUERY_KEY, DYNAMODB_TABLES_KEY])
      },
    },
  )
}

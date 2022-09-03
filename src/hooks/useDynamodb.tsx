import { CreateTableCommandInput } from "@aws-sdk/client-dynamodb"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { dataProvider } from "../providers"

const DYNAMODB_QUERY_KEY = "__dynamodb__"
const DYNAMODB_TABLES_KEY = "tables"

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

import {
  DynamoDBClient,
  CreateTableCommand,
  CreateTableCommandInput,
  CreateTableCommandOutput,
  ListTablesCommandInput,
  ListTablesCommandOutput,
  ListTablesCommand,
  DeleteTableCommandInput,
  DeleteTableCommandOutput,
  DeleteTableCommand,
} from "@aws-sdk/client-dynamodb"

import { awsConfig } from "/@/providers"

export const appSyncCommands = {
  listGraphqlApis: "listGraphqlApis",
}

class AppSyncProvider {
  public client

  constructor() {
    this.client = new DynamoDBClient(awsConfig)
  }

  public listTables = async (input?: ListTablesCommandInput): Promise<ListTablesCommandOutput> => {
    const commandInput = {
      ExclusiveStartTableName: input?.ExclusiveStartTableName,
      Limit: input?.Limit,
    }

    const command = new ListTablesCommand(commandInput)
    return this.client
      .send(command)
      .then((data: ListTablesCommandOutput) => {
        const { TableNames, LastEvaluatedTableName, $metadata } = data || {}
        console.log("data", data)

        if (!TableNames || !Array.isArray(TableNames)) {
          Promise.reject()
        }

        return Promise.resolve({
          TableNames,
          LastEvaluatedTableName,
          $metadata,
        })
      })
      .catch(err => {
        const { $response } = err || {}
        let error = err
        if ($response) {
          error = $response
        }

        return Promise.reject(error)
      })
  }

  public createTable = async (
    input: CreateTableCommandInput,
  ): Promise<CreateTableCommandOutput> => {
    const commandInput = {
      AttributeDefinitions: input.AttributeDefinitions,
      TableName: input.TableName,
      KeySchema: input.KeySchema,
      LocalSecondaryIndexes: input.LocalSecondaryIndexes,
      GlobalSecondaryIndexes: input.GlobalSecondaryIndexes,
      BillingMode: input.BillingMode,
      ProvisionedThroughput: input.ProvisionedThroughput,
      StreamSpecification: input.StreamSpecification,
      SSESpecification: input.SSESpecification,
      Tags: input.Tags,
      TableClass: input.TableClass,
    }

    const command = new CreateTableCommand(commandInput)
    return this.client
      .send(command)
      .then((data: CreateTableCommandOutput) => {
        const { $metadata, TableDescription } = data || {}

        if (!TableDescription) {
          Promise.reject()
        }

        return Promise.resolve({ $metadata, TableDescription })
      })
      .catch(err => {
        const { $response } = err || {}
        let error = err
        if ($response) {
          error = $response
        }

        return Promise.reject(error)
      })
  }

  public deleteDynamodbTable = async (
    input: DeleteTableCommandInput,
  ): Promise<DeleteTableCommandOutput> => {
    console.log("input", input)
    const command = new DeleteTableCommand(input)
    return this.client
      .send(command)
      .then((data: DeleteTableCommandOutput) => {
        console.log("data", data)
        const { $metadata } = data || {}

        return Promise.resolve({
          $metadata,
        })
      })
      .catch(err => {
        console.log("err", err)
        const { $response } = err || {}
        let error = err
        if ($response) {
          error = $response
        }

        return Promise.reject(error)
      })
  }
}

export default AppSyncProvider

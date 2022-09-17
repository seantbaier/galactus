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
  DescribeTableCommandInput,
  DescribeTableCommandOutput,
  DescribeTableCommand,
} from "@aws-sdk/client-dynamodb"

import { awsConfig } from "/@/providers"

export const appSyncCommands = {
  listGraphqlApis: "listGraphqlApis",
}

class DynamodbProvider {
  public client

  constructor() {
    this.client = new DynamoDBClient(awsConfig)
  }

  public describeTable = async (
    TableName: DescribeTableCommandInput,
  ): Promise<DescribeTableCommandOutput> => {
    const command = new DescribeTableCommand(TableName)
    return this.client
      .send(command)
      .then((data: ListTablesCommandOutput) => {
        const { TableNames, LastEvaluatedTableName, $metadata } = data || {}

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
    const command = new DeleteTableCommand(input)
    return this.client
      .send(command)
      .then((data: DeleteTableCommandOutput) => {
        const { $metadata } = data || {}

        return Promise.resolve({
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
}

export default DynamodbProvider

import {
  AppSyncClient,
  ListGraphqlApisCommand,
  ListGraphqlApisCommandInput,
  ListGraphqlApisCommandOutput,
  CreateGraphqlApiCommand,
  CreateGraphqlApiCommandInput,
  CreateGraphqlApiCommandOutput,
  DeleteGraphqlApiCommandInput,
  DeleteGraphqlApiCommandOutput,
  DeleteGraphqlApiCommand,
} from "@aws-sdk/client-appsync"

import { awsConfig } from "/@/providers"

export const appSyncCommands = {
  listGraphqlApis: "listGraphqlApis",
}

class AppSyncProvider {
  public client

  constructor() {
    this.client = new AppSyncClient(awsConfig)
  }

  public listGraphqlApis = async (
    input?: ListGraphqlApisCommandInput,
  ): Promise<ListGraphqlApisCommandOutput> => {
    const commandInput = {
      maxResults: input?.maxResults,
      nextToken: input?.nextToken,
    }

    const command = new ListGraphqlApisCommand(commandInput)
    return this.client
      .send(command)
      .then((data: ListGraphqlApisCommandOutput) => {
        const { graphqlApis = [], nextToken, $metadata } = data || {}

        if (!graphqlApis || !Array.isArray(graphqlApis)) {
          Promise.reject()
        }

        return Promise.resolve({
          graphqlApis,
          nextToken,
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

  public createGraphqlApi = async (
    input: CreateGraphqlApiCommandInput,
  ): Promise<CreateGraphqlApiCommandOutput> => {
    const commandInput = {
      name: "local-appsync-api",
      logConfig: input.logConfig,
      authenticationType: input.authenticationType,
      userPoolConfig: input.userPoolConfig,
      openIDConnectConfig: input.openIDConnectConfig,
      tags: input.tags,
      additionalAuthenticationProviders: input.additionalAuthenticationProviders,
      xrayEnabled: input.xrayEnabled,
      lambdaAuthorizerConfig: input.lambdaAuthorizerConfig,
    }

    const command = new CreateGraphqlApiCommand(commandInput)
    return this.client
      .send(command)
      .then((data: CreateGraphqlApiCommandOutput) => {
        const { $metadata, graphqlApi } = data || {}

        if (!graphqlApi) {
          Promise.reject()
        }

        return Promise.resolve({ $metadata, graphqlApi })
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

  public deleteGraphqlApi = async ({
    apiId,
  }: DeleteGraphqlApiCommandInput): Promise<DeleteGraphqlApiCommandOutput> => {
    const command = new DeleteGraphqlApiCommand({ apiId })
    return this.client
      .send(command)
      .then((data: DeleteGraphqlApiCommandOutput) => {
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

export default AppSyncProvider

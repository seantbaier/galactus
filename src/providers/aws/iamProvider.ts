import {
  IAMClient,
  GetRoleCommand,
  GetRoleCommandInput,
  GetRoleCommandOutput,
  ListRolesCommand,
  ListRolesCommandInput,
  ListRolesCommandOutput,
} from "@aws-sdk/client-iam"

import { awsConfig } from "/@/providers"

export const appSyncCommands = {
  listGraphqlApis: "listGraphqlApis",
}

class IamProvider {
  public client

  constructor() {
    this.client = new IAMClient(awsConfig)
  }

  public listRoles = async ({
    PathPrefix,
    Marker,
    MaxItems,
  }: ListRolesCommandInput): Promise<ListRolesCommandOutput> => {
    const command = new ListRolesCommand({ PathPrefix, Marker, MaxItems })
    console.log("command", Marker)
    return this.client
      .send(command)
      .then((data: ListRolesCommandOutput) => {
        const { Roles, $metadata } = data || {}
        console.log("roles", Roles)

        if (!Roles || !Array.isArray(Roles)) {
          Promise.reject()
        }

        return Promise.resolve({
          Roles,
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

  public getRole = async (RoleName: GetRoleCommandInput): Promise<GetRoleCommandOutput> => {
    const command = new GetRoleCommand(RoleName)
    return this.client
      .send(command)
      .then((data: GetRoleCommandOutput) => {
        const { Role, $metadata } = data || {}

        if (!Role || !Array.isArray(Role)) {
          Promise.reject()
        }

        return Promise.resolve({
          Role,
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

export default IamProvider

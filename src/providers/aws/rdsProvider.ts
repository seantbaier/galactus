import {
  RDSClient,
  CreateDBInstanceCommand,
  CreateDBInstanceCommandInput,
  CreateDBInstanceCommandOutput,
  DescribeDBInstancesCommand,
  DescribeDBInstancesCommandInput,
  DescribeDBInstancesCommandOutput,
  DeleteDBInstanceCommand,
  DeleteDBInstanceCommandInput,
  DeleteDBInstanceCommandOutput,
} from "@aws-sdk/client-rds"

import { awsConfig } from "/@/providers"

class RDSProvider {
  public client

  constructor() {
    this.client = new RDSClient(awsConfig)
  }

  public describeDbInstances = async (
    input: DescribeDBInstancesCommandInput,
  ): Promise<DescribeDBInstancesCommandOutput> => {
    const command = new DescribeDBInstancesCommand(input)
    return this.client
      .send(command)
      .then((data: DescribeDBInstancesCommandOutput) => {
        const { DBInstances, Marker, $metadata } = data || {}

        if (!DBInstances || !Array.isArray(DBInstances)) {
          Promise.reject()
        }

        return Promise.resolve({
          DBInstances,
          Marker,
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

  public createDbInstance = async (
    input: CreateDBInstanceCommandInput,
  ): Promise<CreateDBInstanceCommandOutput> => {
    const command = new CreateDBInstanceCommand(input)
    return this.client
      .send(command)
      .then((data: CreateDBInstanceCommandOutput) => {
        const { DBInstance, $metadata } = data || {}

        if (!DBInstance) {
          Promise.reject()
        }

        return Promise.resolve({
          DBInstance,
          $metadata,
        })
      })
      .catch(err => Promise.reject(err))
  }

  public deleteDbInstance = async ({
    DBInstanceIdentifier,
    FinalDBSnapshotIdentifier,
    DeleteAutomatedBackups = true,
    SkipFinalSnapshot = true,
  }: DeleteDBInstanceCommandInput): Promise<DeleteDBInstanceCommandOutput> => {
    const command = new DeleteDBInstanceCommand({
      DBInstanceIdentifier,
      DeleteAutomatedBackups,
      FinalDBSnapshotIdentifier,
      SkipFinalSnapshot,
    })
    return this.client
      .send(command)
      .then((data: DeleteDBInstanceCommandOutput) => {
        const { DBInstance, $metadata } = data || {}

        return Promise.resolve({
          DBInstance,
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

export default RDSProvider

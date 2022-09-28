import {
  KafkaClient,
  CreateClusterCommand,
  CreateClusterCommandInput,
  CreateClusterCommandOutput,
  ListClustersCommandInput,
  ListClustersCommandOutput,
  ListClustersCommand,
  DeleteClusterCommandInput,
  DeleteClusterCommandOutput,
  DeleteClusterCommand,
} from "@aws-sdk/client-kafka"

import { awsConfig } from "/@/providers"

class KafkaProvider {
  public client

  constructor() {
    this.client = new KafkaClient(awsConfig)
  }

  public listClusters = async (
    input: ListClustersCommandInput,
  ): Promise<ListClustersCommandOutput> => {
    const command = new ListClustersCommand(input)
    return this.client
      .send(command)
      .then((data: ListClustersCommandOutput) => {
        const { ClusterInfoList, NextToken, $metadata } = data || {}

        if (!ClusterInfoList || !Array.isArray(ClusterInfoList)) {
          Promise.reject()
        }

        return Promise.resolve({
          ClusterInfoList,
          NextToken,
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

  public createCluster = async (
    input: CreateClusterCommandInput,
  ): Promise<CreateClusterCommandOutput> => {
    const command = new CreateClusterCommand(input)
    return this.client
      .send(command)
      .then((data: CreateClusterCommandOutput) => {
        const { ClusterName, ClusterArn, State, $metadata } = data || {}

        if (!ClusterName) {
          Promise.reject()
        }

        return Promise.resolve({
          ClusterName,
          ClusterArn,
          State,
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

  public deleteCluster = async (
    input: DeleteClusterCommandInput,
  ): Promise<DeleteClusterCommandOutput> => {
    const command = new DeleteClusterCommand(input)
    return this.client
      .send(command)
      .then((data: DeleteClusterCommandOutput) => {
        const { ClusterArn, State, $metadata } = data || {}

        return Promise.resolve({
          ClusterArn,
          State,
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

export default KafkaProvider

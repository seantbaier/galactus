import {
  CloudWatchLogsClient,
  DescribeLogGroupsCommand,
  DescribeLogGroupsCommandInput,
  DescribeLogGroupsCommandOutput,
} from "@aws-sdk/client-cloudwatch-logs"

import { awsConfig } from "/@/providers"

class CloudwatchProvider {
  public client

  constructor() {
    this.client = new CloudWatchLogsClient(awsConfig)
  }

  public listLogGroups = async (
    input: DescribeLogGroupsCommandInput,
  ): Promise<DescribeLogGroupsCommandOutput> => {
    const command = new DescribeLogGroupsCommand(input)

    return this.client
      .send(command)
      .then((data: DescribeLogGroupsCommandOutput) => {
        // const { logGroups, nextToken, $metadata } = data || {}

        if (!data) {
          Promise.reject()
        }

        // if (data) {
        //   return Promise.resolve(data)
        // }

        return Promise.resolve({
          logGroups: data?.logGroups,
          nextToken: data.nextToken,
          $metadata: data?.$metadata,
        })
      })
      .catch((err: any) => {
        return Promise.reject(err)
      })
  }
}

export default CloudwatchProvider

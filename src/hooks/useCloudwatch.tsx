import { DescribeLogGroupsCommandInput } from "@aws-sdk/client-cloudwatch-logs"

import { useQuery } from "@tanstack/react-query"

import { dataProvider } from "/@/providers"
import { CLOUDWATCH_QUERY_KEY, CLOUDWATCH_LOG_GROUPS_KEY } from "./constants"

export const useListLogGroups = async (input: DescribeLogGroupsCommandInput) =>
  useQuery([CLOUDWATCH_QUERY_KEY, CLOUDWATCH_LOG_GROUPS_KEY], async () =>
    dataProvider.cloudwatch.listLogGroups(input),
  )

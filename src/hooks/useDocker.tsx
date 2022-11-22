import { useQuery } from "@tanstack/react-query"

import { dataProvider } from "/@/providers"
import { DOCKER_QUERY_KEY, DOCKER_INFO_KEY } from "/@/hooks/constants"

export const useDockerInfo = () =>
  useQuery([DOCKER_QUERY_KEY, DOCKER_INFO_KEY], async () => dataProvider.docker.info())

import { ListRolesCommandInput } from "@aws-sdk/client-iam"
import { useQuery } from "@tanstack/react-query"
import { dataProvider } from "/@/providers"
import { IAM_QUERY_KEY, IAM_ROLES_KEY } from "./constants"

export const useListRoles = ({ PathPrefix, Marker, MaxItems }: ListRolesCommandInput) =>
  useQuery([IAM_QUERY_KEY, IAM_ROLES_KEY], async () =>
    dataProvider.iam.listRoles({ PathPrefix, Marker, MaxItems }),
  )

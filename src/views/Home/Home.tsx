import { useQuery } from "@tanstack/react-query"

import { dataProvider } from "/@/providers"
import { AppSyncTableWidget, DynamodbTableWidget } from "/@/components/widgets/TableWidgets"

function Home(): JSX.Element {
  const { data } = useQuery(["graphqlApis"], () => dataProvider.appsync.listGraphqlApis())
  const { graphqlApis = [] } = data || {}
  console.log("apis", data)

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-xl mb-4">Dashboard</h1>
        <AppSyncTableWidget items={graphqlApis} />
        <DynamodbTableWidget />
      </div>
    </div>
  )
}

export default Home

import { AppSyncTableWidget, DynamodbTableWidget } from "/@/components/widgets/TableWidgets"

function Home(): JSX.Element {
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-xl mb-4">Dashboard</h1>
        <AppSyncTableWidget />
        <DynamodbTableWidget />
      </div>
    </div>
  )
}

export default Home

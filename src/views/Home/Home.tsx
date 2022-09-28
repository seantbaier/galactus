import {
  AppSyncTableWidget,
  DynamodbTableWidget,
  KafkaWidget,
} from "/@/components/widgets/TableWidgets"
import { Dashboard } from "/@/components/Dashboard"

function Home(): JSX.Element {
  return (
    <Dashboard>
      <div>
        <div className="mb-4">
          <h1 className="text-xl mb-4">Dashboard</h1>
          <AppSyncTableWidget />
          <DynamodbTableWidget />
          <KafkaWidget />
        </div>
      </div>
    </Dashboard>
  )
}

export default Home

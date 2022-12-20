import { useReducer } from "react"

import { UpdateIcon } from "/@/components/Icons"
import { classNames } from "/@/utils/tailwind"
import { useCreateCluster } from "/@/hooks/useKafka"

import KafkaClustersTable from "/@/views/Kafka/KafkaClustersTable"

type KafkaWidgetProps = {
  className?: string
}

function KafkaWidget({ className = "" }: KafkaWidgetProps): JSX.Element {
  const rerender = useReducer(() => ({}), {})[1]

  const createClusterMutation = useCreateCluster()

  const onCreate = () => {
    const commandInput = {
      BrokerNodeGroupInfo: {
        InstanceType: "kafka.m5.xlarge",
        BrokerAZDistribution: "DEFAULT",
        ClientSubnets: ["subnet-01", "subnet-02", "subnet-03"],
      },
      // ClientAuthentication
      ClusterName: "local-cluster",
      // ConfigurationInfo
      // EncryptionInfo
      // EnhancedMonitoring
      KafkaVersion: "2.2.1",
      // LoggingInfo
      NumberOfBrokerNodes: 3,
      // OpenMonitoring
      // Tags
    }
    createClusterMutation.mutate(commandInput)
  }

  return (
    <div className={classNames("flex flex-col justify-between my-6", className)}>
      <div className="flex items-center mb-2">
        <h2 className="text-lg mr-4">MSK Clusters</h2>

        <button onClick={rerender} className="text-primary-light" type="button">
          <UpdateIcon />
        </button>
      </div>

      <KafkaClustersTable />
      <div className="flex justify-between items-center">
        <button
          onClick={onCreate}
          className={classNames(
            "text-xs px-6 py-2 rounded-3xl bg-black-main font-semibold text-white-main border-4 border-primary-light",
          )}
          type="button"
        >
          Create
        </button>
      </div>
    </div>
  )
}

export default KafkaWidget

import { useReducer } from "react"

import { UpdateIcon } from "/@/components/Icons"
import { classNames } from "/@/utils/tailwind"

import RDSDBInstanceTable from "/@/views/RDS/RDSDBInstanceTable"
import { useCreateDBInstance } from "/@/hooks/useRDS"

type RDSInstanceWidgetProps = {
  className?: string
}

function RDSInstanceWidget({ className = "" }: RDSInstanceWidgetProps): JSX.Element {
  const rerender = useReducer(() => ({}), {})[1]

  const createDBInstanceMutation = useCreateDBInstance()

  const onCreate = () => {
    const commandInput = {
      AllocatedStorage: 10,
      DBInstanceClass: "db.t3.small",
      DBName: "localstack-learning",
      DBInstanceIdentifier: "localstack-learning",
      Engine: "postgres",
      EngineVersion: "13.4",
      MasterUserPassword: "password",
      MasterUsername: "postgres",
      // AutoMinorVersionUpgrade
      // AvailabilityZone
      // BackupRetentionPeriod
      // BackupTarget
      // CharacterSetName
      // CopyTagsToSnapshot
      // CustomIamInstanceProfile
      // DBClusterIdentifier
      // DBParameterGroupName
      // DBSecurityGroups
      // DBSubnetGroupName
      // DeletionProtection
      // Domain
      // DomainIAMRoleName
      // EnableCloudwatchLogsExports
      // EnableCustomerOwnedIp
      // EnableIAMDatabaseAuthentication
      // EnablePerformanceInsights
      // Iops
      // KmsKeyId
      // LicenseModel
      // MaxAllocatedStorage
      // MonitoringInterval
      // MonitoringRoleArn
      // MultiAZ
      // NcharCharacterSetName
      // NetworkType
      // OptionGroupName
      // PerformanceInsightsKMSKeyId
      // PerformanceInsightsRetentionPeriod
      // Port
      // PreferredBackupWindow
      // PreferredMaintenanceWindow
      // ProcessorFeatures
      // PromotionTier
      // PubliclyAccessible
      // StorageEncrypted
      // StorageType
      // Tags
      // TdeCredentialArn
      // TdeCredentialPassword
      // Timezone
      // VpcSecurityGroupIds
    }
    createDBInstanceMutation.mutate(commandInput)
  }

  return (
    <div className={classNames("flex flex-col justify-between my-6", className)}>
      <div className="flex items-center mb-2">
        <h2 className="text-lg mr-4">RDS Instances</h2>

        <button onClick={rerender} className="text-primary-light" type="button">
          <UpdateIcon />
        </button>
      </div>

      <RDSDBInstanceTable />
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

export default RDSInstanceWidget

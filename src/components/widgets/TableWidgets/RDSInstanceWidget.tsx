import { useReducer } from "react"

import { UpdateIcon } from "/@/components/Icons"
import { classNames } from "/@/utils/tailwind"

import { RDSDBInstancesTable } from "/@/views/RDS/RDSInstancesTable/RDSDBInstancesTable"
import { useCreateDBInstance, useDescribeDBInstances } from "/@/hooks/useRDS"
import { createDBInstanceCommandInput } from "/@/views/RDS/rdsCommands"

type RDSInstanceWidgetProps = {
  className?: string
}

function RDSInstanceWidget({ className = "" }: RDSInstanceWidgetProps): JSX.Element {
  const rerender = useReducer(() => ({}), {})[1]
  const { data } = useDescribeDBInstances({})
  const { DBInstances: items = [] } = data || {}

  const createDBInstanceMutation = useCreateDBInstance()

  const onCreate = () => {
    createDBInstanceMutation.mutate(createDBInstanceCommandInput)
  }

  return (
    <div className={classNames("flex flex-col justify-between my-6", className)}>
      <div className="flex items-center mb-2">
        <h2 className="text-lg mr-4">RDS Instances</h2>

        <button onClick={rerender} className="text-primary-light" type="button">
          <UpdateIcon />
        </button>
      </div>

      <RDSDBInstancesTable items={items} />
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

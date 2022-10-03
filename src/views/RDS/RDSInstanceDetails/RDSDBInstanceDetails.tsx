import { useReducer } from "react"
import { useParams } from "react-router-dom"
import { UpdateIcon } from "/@/components/Icons"

import { classNames } from "/@/utils/tailwind"
import { useDescribeDBInstances } from "/@/hooks/useRDS"
import { RDSDBInstancesTable } from "../RDSInstancesTable/RDSDBInstancesTable"

type TableWidgetProps = {
  className?: string
}

function RDSDBInstanceDetails({ className = "" }: TableWidgetProps): JSX.Element {
  const rerender = useReducer(() => ({}), {})[1]
  const { dbInstanceName } = useParams()
  const { data } = useDescribeDBInstances({})
  const { DBInstances: items = [] } = data || {}

  return (
    <div className={classNames("my-6 p-2 w-[100%]", className)}>
      <div className="flex items-center mb-2">
        <h2 className="text-lg mr-4">{dbInstanceName}</h2>

        <button onClick={() => rerender()} className="text-primary-light" type="button">
          <UpdateIcon />
        </button>
      </div>

      <RDSDBInstancesTable items={items} />
    </div>
  )
}

export default RDSDBInstanceDetails

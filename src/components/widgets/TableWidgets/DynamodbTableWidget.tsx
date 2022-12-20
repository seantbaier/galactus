import { useReducer, useState } from "react"

import { UpdateIcon } from "/@/components/Icons"
import { classNames } from "/@/utils/tailwind"

import DynamodbTableForm from "/@/components/Forms/DynamodbForms/DynamodbTableForm"

type DynamodbTableWidgetProps = {
  className?: string
}

function DynamodbTableWidget({ className = "" }: DynamodbTableWidgetProps): JSX.Element {
  const [showForm, setShowForm] = useState<boolean>(false)

  const rerender = useReducer(() => ({}), {})[1]

  const onCreate = () => {
    setShowForm(true)
  }

  return (
    <div className={classNames("my-6", className)}>
      {showForm ? <DynamodbTableForm open={showForm} setOpen={setShowForm} /> : null}
      <div className="flex items-center mb-2">
        <h2 className="text-lg mr-4">Dynamodb</h2>

        <button onClick={rerender} className="text-primary-light" type="button">
          <UpdateIcon />
        </button>
      </div>

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

export default DynamodbTableWidget

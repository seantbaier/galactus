import { useState } from "react"
import { CreateTableCommandInput, GlobalSecondaryIndex } from "@aws-sdk/client-dynamodb"

import DynamodbFormModal from "./DynamodbFormModal"
import { Button } from "/@/components/Buttons/Button"

import { useCreateDynamodbTable } from "/@/hooks/useDynamodb"
import { classNames } from "/@/utils/tailwind"

type DynamodbTableFormProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

function DynamodbTableForm({ open, setOpen }: DynamodbTableFormProps) {
  const [tableName, setTableName] = useState<string>()
  const [globalSecondaryIndexes, setGlobalSecondaryIndexes] = useState<GlobalSecondaryIndex[]>()

  const createTableMutation = useCreateDynamodbTable()

  const createTable = async () => {
    const commandInput: CreateTableCommandInput = {
      AttributeDefinitions: [
        { AttributeName: "PK", AttributeType: "S" },
        { AttributeName: "SK", AttributeType: "S" },
      ],
      TableName: tableName,
      KeySchema: [
        { AttributeName: "PK", KeyType: "HASH" },
        { AttributeName: "SK", KeyType: "RANGE" },
      ],
      BillingMode: "PAY_PER_REQUEST",
      GlobalSecondaryIndexes: globalSecondaryIndexes,
      //   LocalSecondaryIndexes: input.LocalSecondaryIndexes, ?
      //   ProvisionedThroughput: input.ProvisionedThroughput,
      //   StreamSpecification: input.StreamSpecification,
      //   SSESpecification: input.SSESpecification,
      //   Tags: input.Tags,
      //   TableClass: input.TableClass,
    }

    createTableMutation.mutate(commandInput)
  }

  const onSubmit = () => {
    createTable().then(() => {
      setOpen(!open)
    })
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target || {}
    if (name === "tableName") {
      setTableName(value)
    }
  }

  return (
    <DynamodbFormModal open={open} setOpen={setOpen}>
      <div className="flex min-h-full flex-col justify-center">
        <div className="mb-4">
          <h2 className="text-lg text-white-main font-semibold text-left mb-2">Create Table</h2>
          <p className="text-white-main text-xs text-left">
            DynamoDB is a schemaless database that requires only a table name and a primary key
            when you create the table.
          </p>
        </div>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <div className="mt-1">
              <label htmlFor="tableName" className="block text-white-main text-left text-sm">
                Table name
                <input
                  id="tableName"
                  name="tableName"
                  type="tableName"
                  autoComplete="tableName"
                  required
                  placeholder="This will be used to identify your table"
                  className={classNames(
                    "mt-1 block w-full placeholder:italic",
                    "placeholder:text-white-main placeholder:text-sm placeholder:opacity-[.4]",
                    "bg-black-main appearance-none rounded-md border border-white-light px-3 py-2 shadow-sm",
                    "focus:ring-1 focus:border-primary-light focus:outline-none focus:ring-primary-light",
                  )}
                  onChange={handleOnChange}
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <Button text="Create table" type="submit" />
          </div>
        </form>
      </div>
    </DynamodbFormModal>
  )
}

export default DynamodbTableForm

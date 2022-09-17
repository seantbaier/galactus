import { useState } from "react"
import { CreateTableCommandInput, GlobalSecondaryIndex } from "@aws-sdk/client-dynamodb"

import DynamodbFormModal from "./DynamodbFormModal"
import { Button } from "/@/components/Buttons/Button"

import { useCreateDynamodbTable } from "/@/hooks/useDynamodb"
import { classNames } from "/@/utils/tailwind"

type FormGroupProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
  description?: string
  name: string
  id: string
  type: "text" | "password"
  autoComplete: string
  placeholder?: string
  required?: boolean
  helperText?: string
}

function FormGroup({
  onChange,
  id,
  name,
  type,
  label,
  description = "",
  autoComplete,
  placeholder = "",
  required = false,
  helperText = "",
}: FormGroupProps) {
  return (
    <label htmlFor="tableName" className="block text-white-main text-left text-sm">
      <div className="flex flex-col">
        <span className="mb-1">{label}</span>
        {description ? (
          <span className="block max-w-[70%] text-xs mb-2 opacity-[.5]">{description}</span>
        ) : null}
      </div>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
        className={classNames(
          "mt-1 mb-1 block w-full placeholder:italic",
          "placeholder:text-white-main placeholder:text-sm placeholder:opacity-[.4]",
          "bg-black-main appearance-none rounded-md border border-white-main border-opacity-[.5] px-3 py-2 shadow-sm",
          "focus:ring-1 focus:border-primary-light focus:outline-none focus:ring-primary-light",
        )}
        onChange={onChange}
      />
      <span className="text-xs opacity-[.5] italic">{helperText}</span>
    </label>
  )
}

type DynamodbTableFormProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

function DynamodbTableForm({ open, setOpen }: DynamodbTableFormProps) {
  const [tableName, setTableName] = useState<string>()
  const [partitionKey, setPartitionKey] = useState()
  const [sortKey, setSortKey] = useState()
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
              <FormGroup
                label="Table name"
                id="tableName"
                name="tableName"
                type="text"
                description="This wil be used to identify your table."
                placeholder="Enter a table name"
                autoComplete="tableName"
                required
                onChange={handleOnChange}
                helperText="Between 3 and 255 characters, containing only letters, numbers, underscores (_), hyphens (-), and periods (.)."
              />
            </div>
            <div className="mt-4">
              <FormGroup
                label="Partition key"
                id="partitionKey"
                name="partitionKey"
                type="text"
                autoComplete="partitionKey"
                description="The partition key is part of the table's primary key. It is a hash value that is used to retrieve items from your table and allocate data across hosts for scalability and availability."
                placeholder="Enter a partition key"
                required
                helperText="1 to 255 characters and case sensitive."
                onChange={handleOnChange}
              />
            </div>
            <div className="mt-4">
              <FormGroup
                label="Sort key"
                id="sortKey"
                name="sortKey"
                type="text"
                autoComplete="sortKey"
                description="You can use a sort key as the second part of a table's primary key. The sort key allows you to sort or search among all items sharing the same partition key."
                placeholder="Enter a sort key"
                required
                onChange={handleOnChange}
                helperText="1 to 255 characters and case sensitive."
              />
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

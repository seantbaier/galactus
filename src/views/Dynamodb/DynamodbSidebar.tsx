import React, { useState } from "react"

import { useListDynamodbTables } from "/@/hooks/useDynamodb"
import Combobox from "/@/components/Forms/Comboboxes/Combobox"
import { classNames } from "/@/utils/tailwind"

type TableName = {
  id: number
  name: string
}

type DynamodbTableProps = {
  table: TableName
  selected: boolean
  setSelectedTable: React.Dispatch<React.SetStateAction<TableName | undefined>>
}

function DynamodbTable({ table, selected, setSelectedTable }: DynamodbTableProps) {
  const { name } = table
  return (
    <button
      type="button"
      className={classNames(
        "text-left py-2 border-b border-white-light",
        selected ? "bg-primary-dark text-primary-light" : "",
      )}
      onClick={() => setSelectedTable(table)}
    >
      {name}
    </button>
  )
}

function DynamodbSidebar(): JSX.Element {
  const [query, setQuery] = useState("")
  const [selectedTable, setSelectedTable] = useState<TableName>()

  const { data } = useListDynamodbTables()
  const { TableNames: tableNames = [] } = data || {}

  const isSelected = (name: string) => name.toLowerCase() === selectedTable?.name.toLowerCase()

  const tables = tableNames.map((name, index) => ({ id: index, name }))
  const filteredTables =
    query === ""
      ? tables
      : tables.filter(table => {
          return table.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <div className="flex flex-col h-full min-w-[200px] pr-[15px]">
      <h1 className="text-xl mb-4">Dynamodb</h1>
      {/* <Combobox items={items} /> */}
      {filteredTables.map((table: TableName) => {
        return (
          <DynamodbTable
            key={table.id}
            table={table}
            selected={isSelected(table.name)}
            setSelectedTable={setSelectedTable}
          />
        )
      })}
    </div>
  )
}

export default DynamodbSidebar

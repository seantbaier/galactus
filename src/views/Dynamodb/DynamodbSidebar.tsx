import React, { useState } from "react"

import { useListDynamodbTables } from "/@/hooks/useDynamodb"
import { classNames } from "/@/utils/tailwind"
import { TableCellsIcon } from "/@/components/Icons"

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
        "text-xs text-left pl-3 py-3",
        selected ? "bg-primary-dark text-primary-light" : "text-white-main",
      )}
      onClick={() => setSelectedTable(table)}
    >
      <span className="flex">
        <TableCellsIcon
          className={classNames(
            "h-[15px] w-[15px] mr-2",
            selected ? "text-primary-light" : "text-white-main",
          )}
        />
        {name}
      </span>
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
      <h1 className="text-xl mb-4 pl-3">Dynamodb</h1>
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

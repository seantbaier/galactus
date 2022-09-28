import React, { useState } from "react"

import { useListDynamodbTables } from "/@/hooks/useDynamodb"
import { classNames } from "/@/utils/tailwind"
import { TableCellsIcon } from "/@/components/Icons"
import { NavLink } from "react-router-dom"
import { DYNAMODB_PATH } from "/@/constants/routes"

type TableName = {
  id: number
  name: string
}

type DynamodbTableNameProps = {
  table: TableName
  selected: boolean
  setSelectedTable: React.Dispatch<React.SetStateAction<TableName | undefined>>
}

function DynamodbTableName({ table, selected, setSelectedTable }: DynamodbTableNameProps) {
  const { name } = table
  return (
    <NavLink
      to={`${DYNAMODB_PATH}/${name}`}
      className={classNames(
        "flex text-xs text-left",
        // selected ? "bg-primary-dark text-primary-light" : "text-white-main",
      )}
    >
      <button
        type="button"
        className={classNames(
          "text-xs text-left pl-3 py-3 w-full",
          selected ? "bg-primary-dark text-primary-light" : "text-white-main",
        )}
        onClick={() => setSelectedTable(table)}
      >
        <span className="flex pr-2">
          <TableCellsIcon
            className={classNames(
              "h-[15px] w-[15px] mr-2",
              selected ? "text-primary-light" : "text-white-main",
            )}
          />
          {name}
        </span>
      </button>
    </NavLink>
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
    <div className="flex flex-col h-full min-w-[200px]">
      <h1 className="text-xl mb-4 pl-3">Dynamodb</h1>
      {filteredTables.map((table: TableName) => {
        return (
          <DynamodbTableName
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

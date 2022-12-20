import React, { useEffect, useState } from "react"
import { DBInstance } from "@aws-sdk/client-rds"
import { NavLink, useParams } from "react-router-dom"

import { classNames } from "/@/utils/tailwind"
import { TableCellsIcon } from "/@/components/Icons"
import { RDS_PATH } from "/@/constants/routes"
import { useDescribeDBInstances } from "/@/hooks/useRDS"
import RDSDBInstanceEmptySidebar from "./RDSDBInstanceEmptySidebar"

type RDSInstanceNameProps = {
  instance: any
  selected: boolean
  setSelectedItem: React.Dispatch<React.SetStateAction<DBInstance | undefined>>
}

function RDSInstanceName({ instance, selected, setSelectedItem }: RDSInstanceNameProps) {
  const { DBName } = instance
  return (
    <NavLink to={`${RDS_PATH}/${DBName}`} className={classNames("flex text-xs text-left")}>
      <button
        type="button"
        className={classNames(
          "text-xs text-left pl-3 py-3 w-full",
          selected ? "bg-primary-dark text-primary-light" : "text-white-main",
        )}
        onClick={() => setSelectedItem(instance)}
      >
        <span className="flex pr-2">
          <TableCellsIcon
            className={classNames(
              "h-[15px] w-[15px] mr-2",
              selected ? "text-primary-light" : "text-white-main",
            )}
          />
          {DBName}
        </span>
      </button>
    </NavLink>
  )
}

function RDSSidebar(): JSX.Element {
  const [selectedItem, setSelectedItem] = useState<DBInstance>()
  //   const [query, setQuery] = useState<string>("")

  const { dbInstanceName = "" } = useParams()

  const { data } = useDescribeDBInstances({})
  const { DBInstances: dbInstances = [] } = data || {}

  const isSelected = (dbName: string) => {
    const { DBName = "" } = selectedItem || {}

    return (
      dbName.toLowerCase() === DBName.toLowerCase() ||
      dbName.toLowerCase() === dbInstanceName.toLowerCase()
    )
  }

  const getSelected = React.useCallback(
    (dbName: string) => {
      const result = dbInstances.filter((item: DBInstance) => {
        const { DBName = "" } = item || {}
        return DBName.toLowerCase().includes(dbName.toLowerCase())
      })
      return result[0]
    },
    [dbInstances],
  )

  //   const filteredItems =
  //     query === ""
  //       ? dbInstances
  //       : dbInstances.filter((item: DBInstance) => {
  //           const { DBName = "" } = item || {}
  //           return DBName.toLowerCase().includes(query.toLowerCase())
  //         })
  const filteredItems: any[] = []

  useEffect(() => {
    if (dbInstanceName) {
      setSelectedItem(getSelected(dbInstanceName))
    }
  }, [dbInstanceName, getSelected])

  return (
    <div className="flex flex-col h-full min-w-[200px]">
      <h1 className="text-xl mb-4 pl-3">RDS</h1>
      <h2 className="pl-3">Database Instances</h2>
      {filteredItems.length > 0 ? (
        filteredItems.map((instance: DBInstance) => {
          const { DBName = "" } = instance
          return (
            <RDSInstanceName
              key={DBName}
              instance={instance}
              selected={isSelected(DBName)}
              setSelectedItem={setSelectedItem}
            />
          )
        })
      ) : (
        <div className="pl-3 pt-4">
          <RDSDBInstanceEmptySidebar />
        </div>
      )}
    </div>
  )
}

export default RDSSidebar

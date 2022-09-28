import { createColumnHelper, useReactTable, getCoreRowModel } from "@tanstack/react-table"
import { Link } from "react-router-dom"
import { TrashIcon } from "@radix-ui/react-icons"

import { TableRow, TableHeaderRow, TableFooterRow } from "/@/components/Tables"
import { useListClusters, useDeleteCluster } from "/@/hooks/useKafka"
import { getOriginal } from "/@/utils/reactTable"

function KafkaClustersTable(): JSX.Element {
  const { data } = useListClusters({})
  const { ClusterInfoList: clusters = [] } = data || {}

  const deleteClusterMutation = useDeleteCluster()

  const onDelete = (ClusterArn: string) => deleteClusterMutation.mutate({ ClusterArn })

  const renderDeleteIcon = (info: any) => (
    <button
      className="flex justify-end"
      onClick={() => onDelete(getOriginal(info)?.ClusterArn)}
      type="button"
    >
      <TrashIcon className="text-red-700" />
    </button>
  )

  const renderNameCell = (info: any) => (
    <Link to="/" className="text-primary-light">
      {info.renderValue()}
    </Link>
  )

  const columnHelper = createColumnHelper<any>()
  const clusterColumns = [
    columnHelper.accessor("ClusterName", {
      header: () => "Cluster Name",
      cell: info => renderNameCell(info),
      footer: info => info.column.id,
    }),
    columnHelper.accessor("State", {
      header: () => "State",
      cell: info => info.getValue(),
      footer: info => info.column.id,
    }),
    columnHelper.accessor("NumberOfBrokerNodes", {
      header: "Broker Nodes",
      footer: info => info.column.id,
    }),
    columnHelper.accessor("ClusterArn", {
      header: "Cluster Arn",
      footer: info => info.column.id,
    }),
    columnHelper.accessor("ZookeeperConnectString", {
      header: "Zookeeper Connect String",
      footer: info => info.column.id,
    }),
    columnHelper.accessor("delete", {
      header: "",
      cell: (info: any) => renderDeleteIcon(info),
      footer: info => info.column.id,
    }),
  ]

  const table = useReactTable({
    data: clusters,
    columns: clusterColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className="mb-2 w-full rounded-xl h-full">
      <thead className="bg-black-main rounded-tl-lg rounded-tr-lg">
        {table.getHeaderGroups().map(headerGroup => (
          <TableHeaderRow key={headerGroup.id} headerGroup={headerGroup} />
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <TableRow key={row.id} row={row} />
        ))}
      </tbody>
      <tfoot className="rounded-bl-lg rounded-br-lg bg-black-main">
        {table.getFooterGroups().map(footerGroup => (
          <TableFooterRow key={footerGroup.id} footerGroup={footerGroup} />
        ))}
      </tfoot>
    </table>
  )
}

export default KafkaClustersTable

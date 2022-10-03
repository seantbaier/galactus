import { Button } from "/@/components/Buttons"
import { DBPlusIcon } from "/@/components/Icons"

type RDSDBInstanceEmptyTableProps = {
  onCreate: () => void
}

export default function RDSDBInstanceEmptyTable({ onCreate }: RDSDBInstanceEmptyTableProps) {
  return (
    <div className="bg-black-main rounded-xl w-full p-4">
      <div className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        <DBPlusIcon />
        <p className="mt-2 mb-4 text-sm">Get started by creating a new instance.</p>
        <Button text="Create Instance" className="w-[150px]" onClick={onCreate} />
      </div>
    </div>
  )
}

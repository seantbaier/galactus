import { useParams } from "react-router-dom"

function DynamodbTable() {
  const { tableName } = useParams()
  return (
    <div className="border-l border-white-main border-opacity-[.5] h-full">
      <div className="text-md">
        <h1 className="text-lg">{tableName}</h1>
      </div>
    </div>
  )
}

export default DynamodbTable

import { Dashboard } from "/@/components/Dashboard"

function Docs(): JSX.Element {
  return (
    <Dashboard>
      <div className="mb-4">
        <h1 className="text-xl mb-4">Documentation</h1>
        <h2 className="text-lg mb-2">Running Localstack</h2>
        <span className="text-xs flex mb-4">
          1. Create
          <code className="inline-flex bg-black-dark rounded-sm mx-2"> .env.localstack </code>
          file.
        </span>
        <span className="flex text-xs mb-4">2. Start Localstack services.</span>
        <code className="flex bg-black-dark p-4 text-xs rounded-sm">
          docker run --env-file ./.env.localstack --rm -d -p 4566:4566 -p 4510-4559:4510-4559
          --name localstack localstack/localstack
        </code>
      </div>
    </Dashboard>
  )
}

export default Docs

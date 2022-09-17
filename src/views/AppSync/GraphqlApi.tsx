import GraphiQL from "graphiql"
import "graphiql/graphiql.min.css"

import { APPSYNC_API_KEY, APPSYNC_API_ENDPOINT } from "/@/constants/config"

const credentialsAppSync = {
  "x-api-key": APPSYNC_API_KEY,
}

function GraphqlApi() {
  return (
    <div className="h-full">
      <GraphiQL
        fetcher={async graphQLParams => {
          const data = await fetch(APPSYNC_API_ENDPOINT, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              ...credentialsAppSync,
            },
            body: JSON.stringify(graphQLParams),
            credentials: "omit",
          })
          return data.json().catch(() => data.text())
        }}
      />
    </div>
  )
}

export default GraphqlApi

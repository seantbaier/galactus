import GraphiQL from "graphiql"
import "graphiql/graphiql.min.css"

const APPSYNC_API_URL =
  "https://2vvqhuhbijdzhokrxc3dklnt3y.appsync-api.us-east-1.amazonaws.com/graphql"

const credentialsAppSync = {
  "x-api-key": "da2-jobgkhrkjfd6ngqfevofmzf3s4",
}

function AppSync() {
  return (
    <GraphiQL
      fetcher={async graphQLParams => {
        const data = await fetch(APPSYNC_API_URL, {
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
  )
}

export default AppSync

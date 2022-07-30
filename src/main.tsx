import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { invoke } from "@tauri-apps/api"

import AppProviders from "./contexts"
// now we can call our Command!
// Right-click the application background and open the developer tools.
// You will see "Hello, World!" printed in the console!
invoke("greet", { name: "World 2" })
  // `invoke` returns a Promise
  .then(response => console.log(response))

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
)

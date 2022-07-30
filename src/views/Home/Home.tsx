import { invoke } from "@tauri-apps/api"

import { Dashboard } from "/@/components/Dashboard"

// now we can call our Command!
// Right-click the application background and open the developer tools.
// You will see "Hello, World!" printed in the console!
invoke("greet", { name: "Home Dashboard!" })
  // `invoke` returns a Promise
  .then(response => console.log(response))

function Home(): JSX.Element {
  return (
    <Dashboard>
      <div>Home</div>
    </Dashboard>
  )
}

export default Home

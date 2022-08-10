import { useState } from "react"

import { Setup } from "./views/Setup"
import AppRoutes from "/@/AppRoutes"
import { Footer } from "./components/Footer"
import { Titlebar } from "./components/Titlebar"
import { Dashboard } from "/@/components/Dashboard"

import { TITLEBAR_HEIGHT } from "./constants/layout"
import { classNames } from "/@/utils/tailwind"

function App(): JSX.Element {
  const [setupComplete, setSetupComplete] = useState(false)

  return (
    <div className="h-screen w-screen text-tertiary-main bg-black-main">
      <Titlebar />
      <div className={classNames(`mt-[${TITLEBAR_HEIGHT}]`, "flex h-full")}>
        <Dashboard>
          {setupComplete ? <AppRoutes /> : <Setup setSetupComplete={setSetupComplete} />}
        </Dashboard>
      </div>
      <Footer />
    </div>
  )
}

export default App

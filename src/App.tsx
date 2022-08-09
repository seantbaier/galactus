import { useEffect, useState } from "react"
import { invoke } from "@tauri-apps/api"

import { Setup } from "./views/Setup"
import AppRoutes from "/@/AppRoutes"
import { Titlebar } from "./components/Titlebar"
import { Dashboard } from "/@/components/Dashboard"

import { SYSTEM_SETUP_CHECK } from "./constants/system"
import { TITLEBAR_HEIGHT } from "./constants/layout"
import { classNames } from "/@/utils/tailwind"

function App(): JSX.Element {
  const [dockerInstalled, setDockerInstalled] = useState(false)
  const [setupComplete, setSetupComplete] = useState(false)

  useEffect(() => {
    invoke("docker_is_installed", { name: "Home Dashboard!" }).then(response => {
      if (response === SYSTEM_SETUP_CHECK.DOCKER_SUCCESS_RESPONSE) {
        window.setTimeout(() => setDockerInstalled(true), 5000)
      }
    })
  }, [])

  useEffect(() => {
    if (dockerInstalled) {
      //   setSetupComplete(true)
    }
  }, [dockerInstalled])

  return (
    <div className="h-screen w-screen text-tertiary-main bg-black-main">
      <Titlebar />
      <div className={classNames(`mt-[${TITLEBAR_HEIGHT}]`, "flex h-full")}>
        <Dashboard>
          {setupComplete ? <AppRoutes /> : <Setup dockerInstalled={dockerInstalled} />}
        </Dashboard>
      </div>
    </div>
  )
}

export default App

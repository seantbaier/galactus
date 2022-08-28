import { System } from "./views/System"
import AppRoutes from "/@/AppRoutes"
import { Footer } from "./components/Footer"
import { Titlebar } from "./components/Titlebar"
import { Dashboard } from "/@/components/Dashboard"
import { ToastViewPort } from "/@/components/Toast"
import { SystemProvider, useSystem } from "./system/systemContext"

import { TITLEBAR_HEIGHT } from "./constants/layout"
import { classNames } from "/@/utils/tailwind"

function SystemSetup(): JSX.Element {
  const { systemSetupComplete } = useSystem()

  return (
    <div className="h-screen w-screen text-tertiary-main bg-black-main">
      <Titlebar />
      <div className={classNames(`mt-[${TITLEBAR_HEIGHT}]`, "flex h-full")}>
        <Dashboard>{systemSetupComplete ? <AppRoutes /> : <System />}</Dashboard>
      </div>
      <Footer />
    </div>
  )
}

function App(): JSX.Element {
  return (
    <SystemProvider>
      <SystemSetup />
      <ToastViewPort className="fixed bottom-0 right-0 flex-col p-[25px] w-[390px] m-0 z-[2147483647] outline-none" />
    </SystemProvider>
  )
}

export default App

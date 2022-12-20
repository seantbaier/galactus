import AppRoutes from "/@/AppRoutes"
import { Footer } from "./components/Footer"
import { Titlebar } from "./components/Titlebar"
import { ToastViewPort } from "/@/components/Toast"

import { classNames } from "/@/utils/tailwind"

function Main(): JSX.Element {
  return (
    <div className={classNames("flex h-full")}>
      <AppRoutes />
    </div>
  )
}

function App(): JSX.Element {
  return (
    <div className="flex flex-col justify-items-stretch h-screen w-screen text-tertiary-main bg-black-main">
      <Titlebar />
      <Main />
      <Footer />
      <ToastViewPort className="fixed bottom-0 right-0 flex-col p-[25px] w-[390px] m-0 z-[2147483647] outline-none" />
    </div>
  )
}

export default App

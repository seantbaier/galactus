// Componentes
import { Navigation } from "./Navbar"

import { classNames } from "/@/utils/tailwind"
import { SIDEBAR_WIDTH } from "/@/constants/layout"

function Sidebar(): JSX.Element {
  return (
    <div
      className={classNames(
        "flex justify-center pt-[15px] bg-black-dark mt-[30px] border-r border-white-light",
        SIDEBAR_WIDTH,
      )}
    >
      <Navigation />
    </div>
  )
}

export default Sidebar

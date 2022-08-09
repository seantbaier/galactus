// Components
import MacOSTitlebar from "./MacOsTitlebar/MacOSTitlebar"

export type TitlebarProps = {
  className?: string
}

function Titlebar({ className = "" }: TitlebarProps): JSX.Element {
  return <MacOSTitlebar className={className} />
}

export default Titlebar

import { BrowserRouter as Router } from "react-router-dom"

interface AppProvidersProps {
  children: React.ReactNode
}

function AppProviders({ children }: AppProvidersProps): JSX.Element {
  return <Router>{children}</Router>
}

export default AppProviders

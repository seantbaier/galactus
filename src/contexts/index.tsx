import { BrowserRouter as Router } from "react-router-dom"

interface AppProvidersProps {
  children: React.ReactNode
}

const AppProviders = ({ children }: AppProvidersProps) => {
  return <Router>{children}</Router>
}

export default AppProviders

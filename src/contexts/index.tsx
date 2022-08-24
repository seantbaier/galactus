import { BrowserRouter as Router } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { ToastProvider } from "/@/components/Toast"

const queryClient = new QueryClient()

interface AppProvidersProps {
  children: React.ReactNode
}

function AppProviders({ children }: AppProvidersProps): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider swipeDirection="right">
        <Router>{children}</Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </ToastProvider>
    </QueryClientProvider>
  )
}

export default AppProviders

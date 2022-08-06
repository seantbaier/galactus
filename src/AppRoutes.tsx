import { Routes, Route } from "react-router-dom"

import { ApiGateway } from "./views/ApiGateway"
import { Home } from "./views/Home"
import { Setup } from "./views/Setup"
import { NotFoundError } from "/@/components/NotFoundError"

function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route index element={<Setup />} />
      <Route path="/" element={<Home />} />
      <Route path="/apigateway" element={<ApiGateway />} />

      <Route path="*" element={<NotFoundError />} />
    </Routes>
  )
}

export default AppRoutes

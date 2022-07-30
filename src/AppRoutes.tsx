import { Routes, Route } from "react-router-dom"

import { ApiGateway } from "./views/ApiGateway"
import { Home } from "./views/Home"
import { NotFoundError } from "/@/components/NotFoundError"

function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/" element={<ApiGateway />} />
      <Route path="/apigateway" element={<ApiGateway />} />

      <Route path="*" element={<NotFoundError />} />
    </Routes>
  )
}

export default AppRoutes

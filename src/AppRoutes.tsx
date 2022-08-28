import { Routes, Route } from "react-router-dom"

import { ApiGateway } from "./views/ApiGateway"
import { Home } from "/@/views/Home"
import { System } from "/@/views/System"
import { NotFoundError } from "/@/components/NotFoundError"
import { Docs } from "/@/views/Docs"

function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/docs" element={<Docs />} />
      <Route path="/system" element={<System />} />
      <Route path="/apigateway" element={<ApiGateway />} />

      <Route path="*" element={<NotFoundError />} />
    </Routes>
  )
}

export default AppRoutes

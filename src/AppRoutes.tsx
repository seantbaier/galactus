import { Routes, Route } from "react-router-dom"

import { ApiGateway } from "./views/ApiGateway"
import { Home } from "/@/views/Home"
import { System } from "/@/views/System"
import { NotFoundError } from "/@/components/NotFoundError"
import { Docs } from "/@/views/Docs"
import { AppSync, GraphqlApi, GraphqlApis } from "/@/views/AppSync"

import {
  APIGATEWAY_PATH,
  APPSYNC_PATH,
  DOCS_PATH,
  ROOT_PATH,
  SYSTEM_PATH,
} from "/@/constants/routes"

function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path={ROOT_PATH} element={<Home />} />
      <Route path={DOCS_PATH} element={<Docs />} />
      <Route path={SYSTEM_PATH} element={<System />} />
      <Route path={APIGATEWAY_PATH} element={<ApiGateway />} />
      <Route path={APPSYNC_PATH} element={<AppSync />}>
        <Route path={`${APPSYNC_PATH}/:apiId`} element={<GraphqlApi />} />
        <Route index element={<GraphqlApis />} />
      </Route>

      <Route path="*" element={<NotFoundError />} />
    </Routes>
  )
}

export default AppRoutes

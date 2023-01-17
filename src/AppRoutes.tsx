import { Routes, Route } from "react-router-dom"

import { ApiGateway } from "./views/ApiGateway"
import Cloudwatch from "/@/views/Cloudwatch/Cloudwatch"
import { Home } from "/@/views/Home"
import { System } from "/@/views/System"
import { NotFoundError } from "/@/components/NotFoundError"
import { Docs } from "/@/views/Docs"
import { Dynamodb, DynamodbTable, DynamodbOperationBuidler } from "/@/views/Dynamodb"

import {
  APIGATEWAY_PATH,
  DOCS_PATH,
  ROOT_PATH,
  SYSTEM_PATH,
  DYNAMODB_PATH,
  CLOUDWATCH_PATH,
} from "/@/constants/routes"

function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path={ROOT_PATH} element={<Home />} />
      <Route path={DOCS_PATH} element={<Docs />} />
      <Route path={SYSTEM_PATH} element={<System />} />

      {/* Cloudwatch */}
      <Route path={CLOUDWATCH_PATH} element={<Cloudwatch />} />

      {/* API Gateway */}
      <Route path={APIGATEWAY_PATH} element={<ApiGateway />} />

      {/* Dynamodb */}
      <Route path={DYNAMODB_PATH} element={<Dynamodb />}>
        <Route path={`${DYNAMODB_PATH}/:tableName`} element={<DynamodbTable />} />
        <Route index element={<DynamodbOperationBuidler />} />
      </Route>

      <Route path="*" element={<NotFoundError />} />
    </Routes>
  )
}

export default AppRoutes

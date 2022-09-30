import { Routes, Route } from "react-router-dom"

import { ApiGateway } from "./views/ApiGateway"
import { Home } from "/@/views/Home"
import { System } from "/@/views/System"
import { NotFoundError } from "/@/components/NotFoundError"
import { Docs } from "/@/views/Docs"
import { AppSync, GraphqlApi, GraphqlApis } from "/@/views/AppSync"
import { Dynamodb, DynamodbTable, DynamodbOperationBuidler } from "/@/views/Dynamodb"
import { RDS, RDSDBInstanceDetails } from "/@/views/RDS"

import {
  APIGATEWAY_PATH,
  APPSYNC_PATH,
  DOCS_PATH,
  ROOT_PATH,
  SYSTEM_PATH,
  DYNAMODB_PATH,
  RDS_PATH,
  MSK_PATH,
} from "/@/constants/routes"

function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path={ROOT_PATH} element={<Home />} />
      <Route path={DOCS_PATH} element={<Docs />} />
      <Route path={SYSTEM_PATH} element={<System />} />

      {/* API Gateway */}
      <Route path={APIGATEWAY_PATH} element={<ApiGateway />} />

      {/* AppSync */}
      <Route path={APPSYNC_PATH} element={<AppSync />}>
        <Route path={`${APPSYNC_PATH}/:apiId`} element={<GraphqlApi />} />
        <Route index element={<GraphqlApis />} />
      </Route>

      {/* Dynamodb */}
      <Route path={DYNAMODB_PATH} element={<Dynamodb />}>
        <Route path={`${DYNAMODB_PATH}/:tableName`} element={<DynamodbTable />} />
        <Route index element={<DynamodbOperationBuidler />} />
      </Route>

      {/* RDS */}
      <Route path={RDS_PATH} element={<RDS />}>
        <Route path={`${RDS_PATH}/:dbInstanceName`} element={<RDSDBInstanceDetails />} />
        <Route index element={<RDSDBInstanceDetails />} />
      </Route>

      {/* MSK */}
      <Route path={MSK_PATH} element={<RDS />}>
        <Route path={`${MSK_PATH}/:clusterName`} element={<RDSDBInstanceDetails />} />
        <Route index element={<RDSDBInstanceDetails />} />
      </Route>

      <Route path="*" element={<NotFoundError />} />
    </Routes>
  )
}

export default AppRoutes

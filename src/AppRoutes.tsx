import { Routes, Route } from "react-router-dom"

const ApiGatewayScreen = () => {
  return <div>temp</div>
}

function AppRoutes() {
  return (
    <Routes>
      <Route index element={<ApiGatewayScreen />} />
      <Route path="/apigateway" element={<ApiGatewayScreen />} />

      <Route path="*" element={<ApiGatewayScreen />} />
    </Routes>
  )
}

export default AppRoutes

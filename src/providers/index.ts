import axios, { AxiosRequestConfig } from "axios"
import { Credentials } from "@aws-sdk/types"

import AppSyncProvider from "./aws/appSyncProvider"
import LocalstackProvider from "./localstackProvider"
import DockerProvider from "./dockerProvider"
import OSSystemProvider from "./osSystemProvider"
import { LOCALSTACK_ENDPOINT, AWS_REGION, APP_URL } from "/@/constants/config"

const credentials: Credentials = {
  accessKeyId: "test",
  secretAccessKey: "test",
}

const awsConfig = {
  region: AWS_REGION,
  endpoint: LOCALSTACK_ENDPOINT,
  credentials,
}

function addAuthenticationMiddleware() {
  axios.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
      const requestUrl: string | undefined = config.url
      const apiUrl: string = APP_URL

      if (requestUrl && apiUrl && requestUrl.includes(apiUrl)) {
        const tokens = localStorage.getItem("token-storage")
        if (tokens) {
          const { accessToken } = JSON.parse(tokens)
          // @ts-ignore
          config.headers.common.authorization = `Bearer ${accessToken.accessToken}` // eslint-disable-line
        }
      }

      return config
    },
    (error: any) => Promise.reject(error),
  )
}

const dataProvider = {
  appsync: new AppSyncProvider(),
  localstack: new LocalstackProvider(),
  docker: new DockerProvider(),
  os: new OSSystemProvider(),
}

addAuthenticationMiddleware()
export { dataProvider, credentials, awsConfig, AppSyncProvider }

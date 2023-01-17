import axios, { AxiosRequestConfig } from "axios"

import AppSyncProvider from "./aws/appSyncProvider"
import CloudwatchProvider from "./aws/cloudwatchProvider"
import DynamodbProvider from "./aws/dynamodbProvider"
import IamProvider from "./aws/iamProvider"
import LocalstackProvider from "./localstackProvider"
import DockerProvider from "./dockerProvider"
import OSSystemProvider from "./osSystemProvider"
import RDSProvider from "./aws/rdsProvider"
import { AWS_REGION, APP_URL, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from "/@/constants/config"
import KafkaProvider from "./aws/kafkaProvider"

const credentials = {
  accessKeyId: "test",
  secretAccessKey: "test",
}

const awsConfig = {
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
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
  docker: new DockerProvider(),
  dynamodb: new DynamodbProvider(),
  iam: new IamProvider(),
  kafka: new KafkaProvider(),
  localstack: new LocalstackProvider(),
  os: new OSSystemProvider(),
  rds: new RDSProvider(),
  cloudwatch: new CloudwatchProvider(),
}

addAuthenticationMiddleware()
export { dataProvider, credentials, awsConfig, AppSyncProvider }

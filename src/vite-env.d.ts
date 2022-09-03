/// <reference types="vite/client" />
declare module "react-query"

export interface GraphqlApiUris {
  GRAPHQL: string
  REALTIME: string
}
export interface GraphqlApi {
  additionalAuthenticationProviders?: string | undefined
  authenticationType: string
  name: string
  apiId: string
  uris: GraphqlApiUris
  authorizerConfig?: undefined
  logConfig?: undefined
  openIDConnectConfig?: undefined
  tags?: undefined
  uris: {
    GRAPHQL: "http://localhost:4566/graphql/8263a90a"
    REALTIME: "ws://localhost:4510/graphql/8263a90a"
  }
  userPoolConfig?: undefined
  wafWebAclArn?: undefined
  xrayEnabled?: boolean
}

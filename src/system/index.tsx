import { SystemProvider, useSystem } from "./systemContext"
import { SystemConfigItem, SystemConfigItemStatus } from "./systemReducer"
import {
  LOCALSTACK_VERSION,
  DOCKER_VERSION,
  DOCKER_INSTALLED_COMMAND,
  DOCKER_SUCCESS_RESPONSE,
  LOCALSTACK_START_COMMAND,
  LOCALSTACK_STOP_COMMAND,
  LOCALSTACK_NETWORK_ERROR,
  LOCALSTACK_RUNNING_CODE,
  LOCALSTACK_INSTALLED_COMMAND,
  LOCALSTACK_SUCCESS_RESPONSE,
  OS_REQUIREMENTS_COMMAND,
  OS_SUCCESS_RESPONSE,
} from "./constants"

export {
  SystemProvider,
  useSystem,
  SystemConfigItemStatus,
  DOCKER_VERSION,
  DOCKER_INSTALLED_COMMAND,
  DOCKER_SUCCESS_RESPONSE,
  LOCALSTACK_VERSION,
  LOCALSTACK_START_COMMAND,
  LOCALSTACK_STOP_COMMAND,
  LOCALSTACK_NETWORK_ERROR,
  LOCALSTACK_RUNNING_CODE,
  LOCALSTACK_INSTALLED_COMMAND,
  LOCALSTACK_SUCCESS_RESPONSE,
  OS_REQUIREMENTS_COMMAND,
  OS_SUCCESS_RESPONSE,
}
export type { SystemConfigItem }

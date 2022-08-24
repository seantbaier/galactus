import {
  DOCKER_SUCCESS_RESPONSE,
  LOCALSTACK_SUCCESS_RESPONSE,
  OS_SUCCESS_RESPONSE,
} from "./constants"

export enum SystemConfigItemStatus {
  waiting = "waiting",
  running = "running",
  done = "done",
  failed = "failed",
}

export type SystemConfigItem = {
  title: string
  description: string
  id?: string
  success: string
  status: SystemConfigItemStatus
}

export interface ISystem {
  docker: SystemConfigItem
  localstack: SystemConfigItem
  os: SystemConfigItem
  startLocalstackServices: () => void
  stopLocalstackServices: () => void
  localstackRunning: () => void
}

export const defaultInitialState: ISystem = {
  docker: {
    title: "Docker is installed",
    description: "Checking for minimum version of Docker.",
    status: SystemConfigItemStatus.waiting,
    success: DOCKER_SUCCESS_RESPONSE,
  },
  localstack: {
    title: "Localstack is installed",
    description: "Checking for minimum version of Localstack.",
    status: SystemConfigItemStatus.waiting,
    success: LOCALSTACK_SUCCESS_RESPONSE,
  },
  os: {
    title: "Checking OS system requirements",
    description: "Pretending like i'm doing something.",
    status: SystemConfigItemStatus.waiting,
    success: OS_SUCCESS_RESPONSE,
  },
  startLocalstackServices: () => {},
  stopLocalstackServices: () => {},
  localstackRunning: () => {},
}

export type SystemSetupActionType = {
  type: SystemSetupAction
  payload: SystemConfigItem
}

export enum SystemSetupAction {
  dockerIsInstalled = "SET_DOCKER_IS_INSTALLED",
  dockerIsRunning = "SET_DOCKER_IS_RUNNING",
  localstackIsInstalled = "SET_LOCALSTACK_IS_INSTALLED",
  updateLocalstackStatus = "UPDATE_LOCALSTACK_STATUS",
  osRequirementsMet = "SET_OS_REQUIREMENTS_MET",
}

export const systemSetupReducer = (state: ISystem, action: SystemSetupActionType): ISystem => {
  switch (action.type) {
    case SystemSetupAction.dockerIsInstalled:
      return { ...state, docker: action.payload }
    case SystemSetupAction.dockerIsRunning:
      return { ...state, docker: action.payload }
    case SystemSetupAction.localstackIsInstalled:
      return { ...state, localstack: action.payload }
    case SystemSetupAction.updateLocalstackStatus:
      return { ...state, localstack: action.payload }
    case SystemSetupAction.osRequirementsMet:
      return { ...state, os: action.payload }
    default:
      return { ...state }
  }
}

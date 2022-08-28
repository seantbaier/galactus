import {
  DOCKER_SUCCESS_RESPONSE,
  LOCALSTACK_SUCCESS_RESPONSE,
  OS_SUCCESS_RESPONSE,
} from "./constants"

export enum SystemConfigItemStatus {
  idle = "idle",
  pending = "pending",
  running = "running",
  done = "done",
  failed = "failed",
}

export interface SystemConfigItem {
  title?: string
  description?: string
  id?: string
  success?: string
  status?: SystemConfigItemStatus
  complete?: boolean
}

export interface ISystem {
  docker: SystemConfigItem
  localstack: SystemConfigItem
  os: SystemConfigItem
  systemSetupComplete: SystemConfigItem
  startLocalstackServices: () => void
  stopLocalstackServices: () => void
  localstackRunning: () => void
}

export const defaultInitialState: ISystem = {
  docker: {
    title: "Docker is installed",
    description: "Checking for minimum version of Docker.",
    status: SystemConfigItemStatus.idle,
    success: DOCKER_SUCCESS_RESPONSE,
    complete: false,
  },
  localstack: {
    title: "Localstack is installed",
    description: "Checking for minimum version of Localstack.",
    status: SystemConfigItemStatus.idle,
    success: LOCALSTACK_SUCCESS_RESPONSE,
    complete: false,
  },
  os: {
    title: "Checking OS system requirements",
    description: "Pretending like i'm doing something.",
    status: SystemConfigItemStatus.idle,
    success: OS_SUCCESS_RESPONSE,
    complete: false,
  },
  systemSetupComplete: {
    title: "System is check is complete",
    status: SystemConfigItemStatus.idle,
    complete: false,
  },
  startLocalstackServices: () => {},
  stopLocalstackServices: () => {},
  localstackRunning: () => {},
}

export enum SystemSetupAction {
  setDockerIsInstalled = "SET_DOCKER_IS_INSTALLED",
  setDockerIsRunning = "SET_DOCKER_IS_RUNNING",
  setLocalstackIsInstalled = "SET_LOCALSTACK_IS_INSTALLED",
  updateLocalstackStatus = "UPDATE_LOCALSTACK_STATUS",
  setOsRequirementsMet = "SET_OS_REQUIREMENTS_MET",
  setSystemSetupComplete = "SET_SYSTEM_SETUP_COMPLETE",
}

export type SystemSetupActionType = {
  type: SystemSetupAction
  payload: SystemConfigItem
}

export const systemSetupReducer = (state: ISystem, action: SystemSetupActionType): ISystem => {
  switch (action.type) {
    case SystemSetupAction.setDockerIsInstalled:
      return { ...state, docker: action.payload }
    case SystemSetupAction.setDockerIsRunning:
      return { ...state, docker: action.payload }
    case SystemSetupAction.setLocalstackIsInstalled:
      return { ...state, localstack: action.payload }
    case SystemSetupAction.updateLocalstackStatus:
      return { ...state, localstack: action.payload }
    case SystemSetupAction.setOsRequirementsMet:
      return { ...state, os: action.payload }
    case SystemSetupAction.setSystemSetupComplete:
      return { ...state, systemSetupComplete: action.payload }
    default:
      return { ...state }
  }
}

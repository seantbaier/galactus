import type { StepType } from "/@/components/Steps"

import {
  DOCKER_SUCCESS_RESPONSE,
  LOCALSTACK_SUCCESS_RESPONSE,
  OS_SUCCESS_RESPONSE,
} from "/@/system/constants"

export type SetupConfig = {
  dockerIsInstalled: boolean
  localstackIsInstalled: boolean
  osRequirementsMet: boolean
}

export type SystemSetupState = {
  docker: StepType
  localstack: StepType
  os: StepType
}

export const defaultInitialState: SystemSetupState = {
  docker: {
    title: "Docker is installed",
    description: "Checking for minimum version of Docker.",
    status: "waiting",
    success: DOCKER_SUCCESS_RESPONSE,
  },
  localstack: {
    title: "Localstack is installed",
    description: "Checking for minimum version of Localstack.",
    status: "waiting",
    success: LOCALSTACK_SUCCESS_RESPONSE,
  },
  os: {
    title: "Checking OS system requirements",
    description: "Pretending like i'm doing something.",
    status: "waiting",
    success: OS_SUCCESS_RESPONSE,
    last: true,
  },
}

export type SystemSetupActionType = {
  type: SystemSetupAction
  payload: StepType
}

export enum SystemSetupAction {
  dockerIsInstalled = "SET_DOCKER_IS_INSTALLED",
  localstackIsInstalled = "SET_LOCALSTACK_IS_INSTALLED",
  osRequirementsMet = "SET_OS_REQUIREMENTS_MET",
}

export const systemSetupReducer = (
  state: SystemSetupState,
  action: SystemSetupActionType,
): SystemSetupState => {
  switch (action.type) {
    case SystemSetupAction.dockerIsInstalled:
      return { ...state, docker: action.payload }
    case SystemSetupAction.localstackIsInstalled:
      return { ...state, localstack: action.payload }
    case SystemSetupAction.osRequirementsMet:
      return { ...state, os: action.payload }
    default:
      return { ...state }
  }
}

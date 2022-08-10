import { useEffect, useCallback, useReducer } from "react"
import { invoke } from "@tauri-apps/api"

import { Steps, Step, StepStatus } from "/@/components/Steps"
import type { StepType } from "/@/components/Steps"
import { SYSTEM_SETUP_CHECK } from "/@/constants/system"
import { DOCKER_INSTALLED, LOCALSTACK_INSTALLED } from "/@/constants/commands"

const TEMP_TIMEOUT_TIME = 3000

type SystemSetupState = {
  docker: StepType
  localstack: StepType
  os: StepType
}

const defaultInitialState: SystemSetupState = {
  docker: {
    title: "Docker is installed",
    description: "Checking for minimum version of Docker.",
    status: "waiting",
    success: SYSTEM_SETUP_CHECK.DOCKER_SUCCESS_RESPONSE,
  },
  localstack: {
    title: "Localstack is installed",
    description: "Checking for minimum version of Localstack.",
    status: "waiting",
    success: SYSTEM_SETUP_CHECK.LOCALSTACK_SUCCESS_RESPONSE,
  },
  os: {
    title: "Checking OS system requirements",
    description: "Pretending like i'm doing something.",
    status: "waiting",
    success: SYSTEM_SETUP_CHECK.OS_SUCCESS_RESPONSE,
    last: true,
  },
}

type SystemSetupActionType = {
  type: SystemSetupAction
  payload: StepType
}

enum SystemSetupAction {
  dockerIsInstalled = "SET_DOCKER_IS_INSTALLED",
  localstackIsInstalled = "SET_LOCALSTACK_IS_INSTALLED",
  osRequirementsMet = "SET_OS_REQUIREMENTS_MET",
}

const systemSetupReducer = (
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

type SetupProps = {
  setSetupComplete: React.Dispatch<React.SetStateAction<boolean>>
}

function Setup({ setSetupComplete }: SetupProps): JSX.Element {
  const [{ docker, localstack, os }, dispatch] = useReducer(
    systemSetupReducer,
    defaultInitialState,
  )

  const steps = [docker, localstack, os]

  const setStatus = useCallback(
    (prevState: StepType, type: SystemSetupAction, status: StepStatus, timeout?: boolean) => {
      window.setTimeout(
        () =>
          dispatch({
            type,
            payload: { ...prevState, status },
          }),
        timeout ? TEMP_TIMEOUT_TIME : 0,
      )
    },
    [],
  )

  const systemCheck = useCallback(async (command: string, success: string) => {
    return invoke(command, { name: "System Requirements Check" }).then(response => {
      let result = false
      if (response === success) {
        result = true
      }
      return result
    })
  }, [])

  const dockerCheck = useCallback(async () => {
    const dockerInstalled = await systemCheck(
      DOCKER_INSTALLED,
      SYSTEM_SETUP_CHECK.DOCKER_SUCCESS_RESPONSE,
    )

    const status: StepStatus = dockerInstalled ? "done" : "failed"
    setStatus(docker, SystemSetupAction.dockerIsInstalled, status, true)
  }, [docker, systemCheck, setStatus])

  const localstackCheck = useCallback(async () => {
    const localstackInstalled = await systemCheck(
      LOCALSTACK_INSTALLED,
      SYSTEM_SETUP_CHECK.LOCALSTACK_SUCCESS_RESPONSE,
    )

    const status: StepStatus = localstackInstalled ? "done" : "failed"
    setStatus(localstack, SystemSetupAction.localstackIsInstalled, status, true)
  }, [localstack, systemCheck, setStatus])

  const osCheck = useCallback(async () => {
    // Temp fake check for requirements
    const osRequirementsMet = window.setTimeout(() => true, TEMP_TIMEOUT_TIME)

    if (osRequirementsMet) {
      setStatus(os, SystemSetupAction.osRequirementsMet, "done", true)
    }
  }, [os, setStatus])

  useEffect(() => {
    if (docker.status === "waiting") {
      setStatus(docker, SystemSetupAction.dockerIsInstalled, "running")
      dockerCheck()
    }

    if (docker.status === "done" && localstack.status === "waiting") {
      setStatus(localstack, SystemSetupAction.localstackIsInstalled, "running")
      localstackCheck()
    }

    if (docker.status === "done" && localstack.status === "done" && os.status === "waiting") {
      setStatus(os, SystemSetupAction.osRequirementsMet, "running")
      osCheck()
    }

    if (docker.status === "done" && localstack.status === "done" && os.status === "done") {
      setSetupComplete(true)
    }
  }, [docker, os, localstack, dockerCheck, localstackCheck, osCheck, setStatus, setSetupComplete])

  return (
    <div className="flex justify-center mt-[10%] w-full">
      <div className="setup-wrapper">
        <h1 className="text-white-main mb-[15px] text-xl font-sans">Checking for dependencies</h1>

        <div className="flex justify-center p-[50px]">
          <Steps>
            {steps.map((step: StepType) => {
              const { title, description, status, last } = step
              return (
                <Step
                  key={title}
                  title={title}
                  description={description}
                  last={last}
                  status={status}
                />
              )
            })}
          </Steps>
        </div>
      </div>
    </div>
  )
}

export default Setup

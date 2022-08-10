import { useEffect, useCallback, useReducer } from "react"
import { invoke } from "@tauri-apps/api"

import { Steps, Step, StepStatus } from "/@/components/Steps"
import type { StepType } from "/@/components/Steps"
import { SYSTEM_SETUP_CHECK } from "/@/constants/system"
import { DOCKER_INSTALLED, LOCALSTACK_INSTALLED } from "/@/constants/commands"
import {
  SystemSetupAction,
  systemSetupReducer,
  defaultInitialState,
  SetupConfig,
} from "./setupReducer"
import { setSetupConfig, getSetupConfig } from "/@/utils/system"

const TEMP_TIMEOUT_TIME = 3000

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
    const setupConfig: SetupConfig | null = getSetupConfig()
    const { dockerIsInstalled, localstackIsInstalled, osRequirementsMet } = setupConfig || {}

    if (dockerIsInstalled && localstackIsInstalled && osRequirementsMet) {
      setSetupComplete(true)
    }
  })

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
      setSetupConfig({
        dockerIsInstalled: true,
        localstackIsInstalled: true,
        osRequirementsMet: true,
      })
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

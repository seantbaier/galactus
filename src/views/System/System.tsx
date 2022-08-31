import { Steps, Step } from "/@/components/Steps"

import { useLocalstackInstalledQuery } from "/@/hooks/useLocalstack"
import {
  DOCKER_SUCCESS_RESPONSE,
  LOCALSTACK_SUCCESS_RESPONSE,
  OS_SUCCESS_RESPONSE,
} from "/@/constants/system"

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

const steps = [
  {
    title: "Docker is installed",
    description: "Checking for minimum version of Docker.",
    status: SystemConfigItemStatus.idle,
    success: DOCKER_SUCCESS_RESPONSE,
    complete: false,
  },
  {
    title: "Localstack is installed",
    description: "Checking for minimum version of Localstack.",
    status: SystemConfigItemStatus.idle,
    success: LOCALSTACK_SUCCESS_RESPONSE,
    complete: false,
  },
  {
    title: "Checking OS system requirements",
    description: "Pretending like i'm doing something.",
    status: SystemConfigItemStatus.idle,
    success: OS_SUCCESS_RESPONSE,
    complete: false,
  },
  {
    title: "System is check is complete",
    status: SystemConfigItemStatus.idle,
    complete: false,
  },
]

function System(): JSX.Element {
  const { data: localstackIsInstalled } = useLocalstackInstalledQuery()

  return (
    <div className="flex justify-center mt-[10%] w-full">
      <div className="flex-col justify-center">
        <h1 className="text-white-main mb-[15px] text-center text-xl font-sans">
          {localstackIsInstalled ? "System Requirements Met!" : "Checking for Dependencies"}
        </h1>

        <div className="flex justify-center p-[50px]">
          <Steps>
            {steps.map((step: SystemConfigItem, index: number) => {
              const { title, description, status } = step
              const last = index + 1 === steps.length
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

export default System

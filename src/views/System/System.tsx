import { Steps, Step } from "/@/components/Steps"

import { useSystem } from "/@/system"
import type { SystemConfigItem } from "/@/system"

function System(): JSX.Element {
  const { docker, localstack, os, systemSetupComplete } = useSystem()
  const steps = [docker, localstack, os]

  return (
    <div className="flex justify-center mt-[10%] w-full">
      <div className="flex-col justify-center">
        <h1 className="text-white-main mb-[15px] text-center text-xl font-sans">
          {systemSetupComplete ? "System Requirements Met!" : "Checking for Dependencies"}
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

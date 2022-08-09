import { useEffect, useState } from "react"

// Components
import { Steps, Step } from "/@/components/Steps"

type StepType = {
  title: string
  description: string
  last?: boolean
}

const setupSteps: StepType[] = [
  {
    title: "Docker is installed",
    description: "Checking for minimum version of Docker.",
  },
  {
    title: "Localstack is installed",
    description: "Checking for minimum version of Localstack.",
  },
  {
    title: "Checking OS system requirements",
    description: "Pretending like i'm doing something.",

    last: true,
  },
]

type SetupStepsProps = {
  current: number
}

function SetupSteps({ current }: SetupStepsProps): JSX.Element {
  return (
    <Steps current={current}>
      {setupSteps.map((step: StepType) => {
        const { title, description, last } = step
        return <Step key={title} title={title} description={description} last={last} />
      })}
    </Steps>
  )
}

type SetupProps = {
  dockerInstalled: boolean
}

function Setup({ dockerInstalled }: SetupProps): JSX.Element {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (dockerInstalled) {
      setCurrent(1)
    }
  }, [dockerInstalled])

  return (
    <div className="flex justify-center mt-[10%] w-full">
      <div className="setup-wrapper">
        <h1 className="text-white-main mb-[15px] text-xl font-sans">Checking for dependencies</h1>

        <div className="flex justify-center p-[50px]">
          <SetupSteps current={current} />
        </div>
      </div>
    </div>
  )
}

export default Setup

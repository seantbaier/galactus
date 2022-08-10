// Components
import StepIcon from "./StepIcon"
import type { StepStatus } from "./Steps"

type StepProps = {
  title: string
  description: string
  last?: boolean
  index?: number
  status: StepStatus
}

function Step({ index, title, description, last = false, status }: StepProps): JSX.Element {
  return (
    <div className="flex">
      <StepIcon status={status} last={last} index={index as number} />

      <div className="overflow-hidden min-h-[48px]">
        <div className="text-md text-white-main">{title}</div>
        <div className="text-sm text-tertiary-main font-sans">{description}</div>
      </div>
    </div>
  )
}

export default Step

// Components
import StepIcon from "./StepIcon"

export type StepStatus = "waiting" | "done" | "running"

type StepProps = {
  title: string
  description: string
  last?: boolean
  status?: StepStatus
  index?: number
}

function Step({
  index,
  title,
  description,
  last = false,
  status = "waiting",
}: StepProps): JSX.Element {
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

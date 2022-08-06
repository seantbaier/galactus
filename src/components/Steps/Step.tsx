import { styled } from "@stitches/react"

// Components
import StepIcon from "./StepIcon"

// Constants
import { TERTIARY } from "/@/constants/colors"

export type StepStatus = "waiting" | "done" | "running"

const StepContainer = styled("div", {
  display: "flex",
})

const Content = styled("div", {
  overflow: "hidden",
  minHeight: "48px",
  display: "block",

  "& .step-item-title": {
    fontSize: "0.9rem",
    marginBottom: "6px",
  },

  "& .step-item-description": {
    fontSize: "0.8rem",
    color: TERTIARY,
    fontFamily: "sans-serif",
  },
})

type StepProps = {
  title: string
  description: string
  last?: boolean
  status: StepStatus
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
    <StepContainer>
      <StepIcon status={status} last={last} index={index as number} />

      <Content>
        <div className="step-item-title">{title}</div>
        <div className="step-item-description">{description}</div>
      </Content>
    </StepContainer>
  )
}

export default Step

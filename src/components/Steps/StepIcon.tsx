import { styled } from "@stitches/react"
import { CheckIcon } from "@radix-ui/react-icons"

import type { StepStatus } from "./Steps"

import { WHITE100, PRIMARY_DARK, PRIMARY_LIGHT, PRIMARY_BLACK } from "/@/constants/colors"

const Icon = styled("div", {
  borderRadius: "100%",
  height: "25px",
  width: "25px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "5px",
  fontSize: "0.8rem",
})

const DoneIcon = styled(Icon, {
  backgroundColor: PRIMARY_DARK,
  border: `1px solid ${PRIMARY_LIGHT}`,
})

const DoneCheckmark = styled(CheckIcon, {
  color: PRIMARY_LIGHT,
})

const WaitingIcon = styled(Icon, {
  backgroundColor: WHITE100,
  color: PRIMARY_BLACK,
})

const InProgressIcon = styled(Icon, {
  backgroundColor: PRIMARY_LIGHT,
  color: WHITE100,
})

const Tail = styled("div", {
  width: "1px",
  height: "20px",
  marginBottom: "5px",
})

const DoneTail = styled(Tail, {
  backgroundColor: PRIMARY_LIGHT,
})

const WaitingTail = styled(Tail, {
  backgroundColor: WHITE100,
})

const StepIconContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginRight: "15px",
})

type StatusIconProps = {
  index: number
  status: StepStatus
}

function StatusIcon({ index, status }: StatusIconProps): JSX.Element {
  const statusIcon = {
    done: (
      <DoneIcon>
        <DoneCheckmark />
      </DoneIcon>
    ),
    running: <InProgressIcon>{index}</InProgressIcon>,
    waiting: <WaitingIcon>{index}</WaitingIcon>,
  }
  return statusIcon[status]
}

type StepIconProps = {
  last?: boolean
  status: StepStatus
  index: number
}

function StepIcon({ index, last = false, status = "waiting" }: StepIconProps): JSX.Element {
  const renderTail = () => (status === "done" ? <DoneTail /> : <WaitingTail />)

  return (
    <StepIconContainer>
      <div className="step-item-icon">
        <StatusIcon index={index} status={status} />
      </div>
      {last ? null : renderTail()}
    </StepIconContainer>
  )
}

export default StepIcon

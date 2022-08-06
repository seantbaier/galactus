import React from "react"
import { styled } from "@stitches/react"

// Constants
import { WHITE100 } from "/@/constants/colors"
import { PRIMARY_FONT_FAMILY } from "/@/constants/project"

export type StepStatus = "waiting" | "done" | "running"

const StepsContainer = styled("div", {
  color: WHITE100,
  fontFamily: PRIMARY_FONT_FAMILY,
})

type StepsProps = {
  current: number
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>[]
}

function Steps({ current, children }: StepsProps): JSX.Element {
  const childrenWithProps = React.Children.map(children, (child, i) => {
    const inProgress = i === current
    const childProps = { inProgress, index: i + 1 }

    const element = child as React.ReactElement<any, string | React.JSXElementConstructor<any>>
    return React.cloneElement(element, { ...childProps })
  })

  return <StepsContainer>{childrenWithProps}</StepsContainer>
}

export default Steps

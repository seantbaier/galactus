import React from "react"

export type StepStatus = "waiting" | "done" | "running" | "failed"

export type StepType = {
  title: string
  description: string
  last?: boolean
  id?: string
  success: string
  status: StepStatus
}

type StepsProps = {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>[]
}

function Steps({ children }: StepsProps): JSX.Element {
  const childrenWithProps = React.Children.map(children, (child, i) => {
    const childProps = { ...child.props, index: i + 1 }
    const element = child as React.ReactElement<any, string | React.JSXElementConstructor<any>>
    return React.cloneElement(element, { ...childProps })
  })

  return <div>{childrenWithProps}</div>
}

export default Steps

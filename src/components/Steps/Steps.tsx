import React from "react"

export type StepStatus = "waiting" | "done" | "running"

type StepsProps = {
  current: number
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>[]
}

function Steps({ current, children }: StepsProps): JSX.Element {
  const childrenWithProps = React.Children.map(children, (child, i) => {
    const inProgress = i === current
    let status = "waiting"
    if (i === current) {
      status = "running"
    } else if (i < current) {
      status = "done"
    }

    const childProps = { inProgress, status, index: i + 1 }

    const element = child as React.ReactElement<any, string | React.JSXElementConstructor<any>>
    return React.cloneElement(element, { ...childProps })
  })

  return <div>{childrenWithProps}</div>
}

export default Steps

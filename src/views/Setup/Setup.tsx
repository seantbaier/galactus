import { useState } from "react"
import { styled } from "@stitches/react"

// Components
import { Dashboard } from "/@/components/Dashboard"
import { Steps, Step } from "/@/components/Steps"
import { GREEN100, WHITE100 } from "/@/constants/colors"
import { PRIMARY_FONT_FAMILY } from "/@/constants/project"

const SetupContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  marginTop: "10%",
  width: "100%",

  "& .setup-wrapper": {
    "& h1": {
      color: WHITE100,
      marginBottom: "15px",
      fontSize: "2rem",
      fontFamily: PRIMARY_FONT_FAMILY,
    },

    "& h2": {
      color: GREEN100,
      textTransform: "capitalize",
      fontFamily: PRIMARY_FONT_FAMILY,
      fontWeight: "bold",
      fontSize: "1rem",
      marginBottom: "15px",
    },

    "& .steps-container": {
      display: "flex",
      justifyContent: "center",
      padding: "50px",
    },
  },
})

function Setup(): JSX.Element {
  const [current, setCurrent] = useState(1)
  return (
    <Dashboard>
      <SetupContainer>
        <div className="setup-wrapper">
          <h1>Checking for dependencies</h1>

          <div className="steps-container">
            <Steps current={current}>
              <Step
                title="Docker is installed"
                description="Checking for minimum version of Docker."
                status="done"
              />
              <Step
                title="Localstack is installed"
                description="Checking for minimum version of Localstack."
                status="running"
              />
              <Step
                title="Checking OS system requirements"
                description="Pretending like i'm doing something."
                status="waiting"
                last
              />
            </Steps>
          </div>
        </div>
      </SetupContainer>
    </Dashboard>
  )
}

export default Setup

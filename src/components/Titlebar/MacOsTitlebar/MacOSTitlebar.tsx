import { appWindow } from "@tauri-apps/api/window"
import { styled } from "@stitches/react"

// Components
import TitlebarButton from "./MacOSTitlebarButton"
import { MacOSCloseIcon, MacOSMaximizeIcon, MacOSMinimizeIcon } from "./MacOSIcons"

// Constants
import { BLACK500, WHITE100 } from "/@/constants/colors"
import { MAC_OS_TITLEBAR_HEIGHT } from "/@/constants/macos"
import { PRIMARY_FONT_FAMILY, PROJECT_NAME } from "/@/constants/project"

const TITLEBAR_CONTAINER_LENGTH = "55px"

const MacOSTitlebarContainer = styled("div", {
  height: MAC_OS_TITLEBAR_HEIGHT,
  backgroundColor: BLACK500,
  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  paddingLeft: "10px",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  userSelect: "none",
  borderBottom: `1px solid rgba(0, 0, 0,0.5)`,
})

const MacOSTitleButtonsContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  width: TITLEBAR_CONTAINER_LENGTH,
  alignItems: "center",

  "& svg": {
    display: "none",
  },

  // psuedo-class
  "&:hover": {
    "& svg": {
      display: "initial",
    },
  },
})

const Title = styled("div", {
  alignSelf: "center",
  justifySelf: "center",
  fontFamily: PRIMARY_FONT_FAMILY,
  fontSize: "0.8rem",
  color: WHITE100,
  width: TITLEBAR_CONTAINER_LENGTH,
  textTransform: "capitalize",
})

const Spacer = styled("div", {
  width: TITLEBAR_CONTAINER_LENGTH,
})

function MacOSTitlebar(): JSX.Element {
  const handleMinimizeWindow = () => appWindow.minimize()
  const handleMaximizeWindow = () => appWindow.maximize()
  const handleCloseWindow = () => appWindow.close()

  return (
    <MacOSTitlebarContainer data-tauri-drag-region className="titlebar">
      <MacOSTitleButtonsContainer>
        <TitlebarButton onClick={handleMinimizeWindow} action="close">
          <MacOSCloseIcon />
        </TitlebarButton>

        <TitlebarButton onClick={handleMaximizeWindow} action="minimize">
          <MacOSMinimizeIcon />
        </TitlebarButton>

        <TitlebarButton onClick={handleCloseWindow} action="maximize">
          <MacOSMaximizeIcon />
        </TitlebarButton>
      </MacOSTitleButtonsContainer>
      <Title>{PROJECT_NAME}</Title>
      <Spacer />
    </MacOSTitlebarContainer>
  )
}

export default MacOSTitlebar

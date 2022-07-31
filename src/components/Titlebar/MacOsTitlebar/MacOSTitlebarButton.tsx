import { styled } from "@stitches/react"

// Constants
import {
  MAC_OS_CLOSE_BUTTON,
  MAC_OS_MAXIMIZE_BUTTON,
  MAC_OS_MINIMIZE_BUTTON,
} from "/@/constants/macos"

const MAC_OS_BUTTON_SIZE = "12px"

const MacOSButton = styled("button", {
  height: MAC_OS_BUTTON_SIZE,
  width: MAC_OS_BUTTON_SIZE,
  borderRadius: "100%",
  border: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0",

  // variants
  variants: {
    action: {
      minimize: {
        backgroundColor: MAC_OS_MINIMIZE_BUTTON,
      },
      maximize: {
        backgroundColor: MAC_OS_MAXIMIZE_BUTTON,
      },
      close: {
        backgroundColor: MAC_OS_CLOSE_BUTTON,
      },
    },
  },
})

type MacOSTitlebarButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode
  action: "minimize" | "maximize" | "close"
}

function MacOSTitlebarButton({
  onClick,
  children,
  action,
}: MacOSTitlebarButtonProps): JSX.Element {
  return (
    <MacOSButton action={action} className="titlebar-button" type="button" onClick={onClick}>
      {children}
    </MacOSButton>
  )
}

export default MacOSTitlebarButton

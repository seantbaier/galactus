import { styled } from "@stitches/react"

const StitchesButton = styled("button", {
  borderRadius: "8px",
  border: "1px solid transparent",
  padding: "0.6em 1.2em",
  fontSize: "1em",
  fontWeight: "500",
  fontFamily: "inherit",
  backgroundColor: "#1a1a1a",
  cursor: "pointer",
  transition: "border-color 0.25s",
})

interface ButtonProps {
  text: string
}

function Button({ text }: ButtonProps): JSX.Element {
  return <StitchesButton>{text}</StitchesButton>
}

export default Button

import { styled } from "@stitches/react"
import { Cross2Icon, MinusIcon, SizeIcon } from "@radix-ui/react-icons"

const ICON_SIZE = "8px"

const MacOSCloseIcon = styled(Cross2Icon, {
  height: ICON_SIZE,
  width: ICON_SIZE,
})

const MacOSMinimizeIcon = styled(MinusIcon, {
  height: ICON_SIZE,
  width: ICON_SIZE,
})

const MacOSMaximizeIcon = styled(SizeIcon, {
  height: ICON_SIZE,
  width: ICON_SIZE,
  transform: "rotate(90deg)",
})

export { MacOSCloseIcon, MacOSMinimizeIcon, MacOSMaximizeIcon }

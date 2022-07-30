import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { NavLink } from "react-router-dom"
import { styled } from "@stitches/react"
import { HomeIcon } from "@radix-ui/react-icons"

const Navbar = styled("div", {
  backgroundColor: "#000000",
  minWidth: "50px",
  display: "flex",
  justifyContent: "center",
  padding: "15px 0 0 0",
})

type NavigationMenuItemProps = {
  to: string
  icon: React.ReactElement
}

function NavigationMenuItem({ to, icon }: NavigationMenuItemProps) {
  return (
    <NavigationMenu.Item>
      <NavLink to={to}>{icon}</NavLink>
    </NavigationMenu.Item>
  )
}

function Navigation(): JSX.Element {
  return (
    <NavigationMenu.Root orientation="vertical">
      <NavigationMenu.List>
        <NavigationMenuItem to="/" icon={<HomeIcon color="#ffffff" />} />
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}

export { Navbar, Navigation }

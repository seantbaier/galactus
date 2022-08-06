import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { NavLink } from "react-router-dom"
import { HomeIcon } from "@radix-ui/react-icons"
import { PRIMARY_LIGHT } from "/@/constants/colors"

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
        <NavigationMenuItem to="/" icon={<HomeIcon color={PRIMARY_LIGHT} />} />
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}

export { Navigation }

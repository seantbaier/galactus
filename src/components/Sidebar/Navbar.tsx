import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { NavLink } from "react-router-dom"
import { HomeIcon } from "@radix-ui/react-icons"
import { BookOpenIcon, CogIcon } from "@heroicons/react/outline"

import { PRIMARY_LIGHT } from "/@/constants/colors"
import { classNames } from "/@/utils/tailwind"

type NavigationMenuItemProps = {
  to: string
  icon: React.ReactElement
  tooltip: string
}

function NavigationMenuItem({ to, icon, tooltip }: NavigationMenuItemProps) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>
        <NavigationMenu.Item>
          <NavLink to={to}>{icon}</NavLink>
        </NavigationMenu.Item>
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content
        sideOffset={5}
        className={classNames(
          "absolute top-[-15px] left-[15px]",
          "bg-black-main text-primary-light text-xs py-[2px] px-[6px] rounded-sm border border-primary-light",
        )}
      >
        {tooltip}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  )
}

function Navigation(): JSX.Element {
  return (
    <TooltipPrimitive.Provider>
      <NavigationMenu.Root orientation="vertical" className="flex-col">
        <NavigationMenu.List className="flex-col space-y-4">
          <NavigationMenuItem tooltip="Home" to="/" icon={<HomeIcon color={PRIMARY_LIGHT} />} />
          <NavigationMenuItem
            tooltip="Docs"
            to="/docs"
            icon={<BookOpenIcon color={PRIMARY_LIGHT} />}
          />
          <NavigationMenuItem
            tooltip="System"
            to="/system"
            icon={<CogIcon color={PRIMARY_LIGHT} />}
          />
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </TooltipPrimitive.Provider>
  )
}

export { Navigation }

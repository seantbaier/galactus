import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { NavLink } from "react-router-dom"
import { HomeIcon } from "@radix-ui/react-icons"
import { BookOpenIcon, CogIcon } from "@heroicons/react/outline"
import { GrGraphQl } from "react-icons/gr"

import { PRIMARY_LIGHT } from "/@/constants/colors"
import { classNames } from "/@/utils/tailwind"
import { APPSYNC_PATH, DOCS_PATH, ROOT_PATH, SYSTEM_PATH } from "/@/constants/routes"

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

const navigation = [
  {
    tooltip: "Dashboard",
    to: ROOT_PATH,
    icon: <HomeIcon color={PRIMARY_LIGHT} />,
  },
  {
    tooltip: "AppSync",
    to: APPSYNC_PATH,
    icon: <GrGraphQl color={PRIMARY_LIGHT} />,
  },
  {
    tooltip: "Docs",
    to: DOCS_PATH,
    icon: <BookOpenIcon color={PRIMARY_LIGHT} />,
  },
  {
    tooltip: "System",
    to: SYSTEM_PATH,
    icon: <CogIcon color={PRIMARY_LIGHT} />,
  },
]

function Navigation(): JSX.Element {
  return (
    <TooltipPrimitive.Provider>
      <NavigationMenu.Root orientation="vertical" className="flex-col">
        <NavigationMenu.List className="flex-col space-y-4">
          {navigation.map(item => {
            return (
              <NavigationMenuItem
                key={item.tooltip}
                tooltip={item.tooltip}
                to={item.to}
                icon={item.icon}
              />
            )
          })}
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </TooltipPrimitive.Provider>
  )
}

export { Navigation }

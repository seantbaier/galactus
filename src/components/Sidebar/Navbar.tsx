import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { NavLink } from "react-router-dom"
import { GrGraphQl } from "react-icons/gr"

import { PRIMARY_LIGHT } from "/@/constants/colors"
import { classNames } from "/@/utils/tailwind"
import { BookOpenIcon, CogIcon, CircleStackIcon, HomeIcon } from "/@/components/Icons"
import {
  APPSYNC_PATH,
  DOCS_PATH,
  DYNAMODB_PATH,
  ROOT_PATH,
  SYSTEM_PATH,
} from "/@/constants/routes"

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
    tooltip: "Dynamodb",
    to: DYNAMODB_PATH,
    icon: <CircleStackIcon color={PRIMARY_LIGHT} />,
  },
]

const secondaryNav = [
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
    <div className="flex flex-col justify-between">
      <div>
        <TooltipPrimitive.Provider>
          <NavigationMenu.Root orientation="vertical" className="flex-col">
            <NavigationMenu.List className="h-full flex-col space-y-4">
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
      </div>
      <div className="mb-[75px]">
        <TooltipPrimitive.Provider>
          <NavigationMenu.Root orientation="vertical" className="flex-col">
            <NavigationMenu.List className="h-full flex-col space-y-4">
              {secondaryNav.map(item => {
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
      </div>
    </div>
  )
}

export { Navigation }

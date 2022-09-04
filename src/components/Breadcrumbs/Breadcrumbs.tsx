import { ChevronRightIcon } from "@heroicons/react/solid"
import { useLocation, Link } from "react-router-dom"

import { ROOT_PATH } from "/@/constants/routes"
import { classNames } from "/@/utils/tailwind"

type BreadcrumbProps = {
  text: string
  href: string
  first?: boolean
}

function Breadcrumb({ text, href, first = false }: BreadcrumbProps) {
  return !text && !href ? null : (
    <li>
      <div className="flex items-center">
        {first ? null : (
          <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
        )}
        <Link
          to={href}
          className={classNames(
            first ? "" : "ml-4",
            "text-sm font-medium text-gray-500 hover:text-primary-light",
          )}
        >
          {text}
        </Link>
      </div>
    </li>
  )
}

type BreadcrumbsProps = {
  className?: string
}

function Breadcrumbs({ className = "" }: BreadcrumbsProps) {
  const { pathname } = useLocation()
  const pathItems = pathname.split("/")

  const crumbs: string[] = []
  pathItems.forEach((item: string, index: number) => {
    if (index === 0) {
      crumbs.push("Dashboard")
    } else if (item) {
      crumbs.push(item)
    }
  }, [])

  return (
    <nav className={classNames("hidden sm:flex pl-2", className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4">
        {crumbs.map((item, index) => {
          return index === 0 ? (
            <Breadcrumb key={item} text="Dashboard" href={ROOT_PATH} first />
          ) : (
            <Breadcrumb key={item} text={item} href={item} />
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs

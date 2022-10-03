import {
  SignalSlashIcon,
  SignalIcon,
  BookOpenIcon,
  CogIcon,
  CircleStackIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  TableCellsIcon,
  BoltIcon,
  Squares2X2Icon,
  ServerStackIcon,
  QueueListIcon,
} from "@heroicons/react/24/outline"
import { classNames } from "/@/utils/tailwind"
import { SVGIconProps } from "./types"

function FolderPlusIcon({
  className = "",
  stroke = "currentColor",
  fill = "none",
  viewBox = "0 0 48 48",
  color = "text-gray-400",
}: SVGIconProps) {
  return (
    <svg
      className={classNames("mx-auto h-12 w-12", color, className)}
      fill={fill}
      viewBox={viewBox}
      stroke={stroke}
      aria-hidden="true"
    >
      <path
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
      />
    </svg>
  )
}

function DBPlusIcon({
  className = "",
  stroke = "currentColor",
  fill = "none",
  viewBox = "0 0 48 48",
  color = "text-gray-400",
}: SVGIconProps) {
  return (
    <svg
      className={classNames("mx-auto h-12 w-12", color, className)}
      xmlns="http://www.w3.org/2000/svg"
      stroke={stroke}
      fill={fill}
      viewBox={viewBox}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
      />
    </svg>
  )
}

function RectangleServerStackIcon({
  stroke = "currentColor",
  fill = "none",
  className = "",
  viewBox = "0 0 24 24",
  color = "text-gray-400",
}: SVGIconProps) {
  return (
    <svg
      className={classNames("w-4 h-4", color, className)}
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      viewBox={viewBox}
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
      />
    </svg>
  )
}

export {
  BoltIcon,
  BookOpenIcon,
  CogIcon,
  CircleStackIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  DBPlusIcon,
  FolderPlusIcon,
  RectangleServerStackIcon,
  SignalIcon,
  SignalSlashIcon,
  Squares2X2Icon,
  TableCellsIcon,
  ServerStackIcon,
  QueueListIcon,
}

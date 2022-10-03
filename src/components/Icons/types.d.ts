export interface IconProps {
  color?: string // must be tailwind string
  className?: string
}

export interface SVGIconProps extends IconProps {
  stroke?: string
  fill?: string
  viewBox?: string
}

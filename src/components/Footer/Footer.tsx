import { classNames } from "/@/utils/tailwind"
import { LocalstackStatusIndicator, DockerStatusIndicator } from "/@/components/StatusIndicator"

export type FooterProps = {
  className?: string
}

function Footer({ className = "" }: FooterProps): JSX.Element {
  return (
    <div
      id="footer"
      className={classNames(
        "flex justify-end items-center w-full h-[30px] bg-black-main border-t border-black-dark px-[10px]",
        className,
      )}
    >
      <LocalstackStatusIndicator />
      <DockerStatusIndicator />
    </div>
  )
}

export default Footer

import { SystemConfigItemStatus } from "/@/views/System"
import StatusIndicator from "./StatusIndicator"
import { useLocalstackStatusQuery } from "/@/hooks/useLocalstack"
import { DOCKER_VERSION } from "/@/constants/system"

function DockerStatusIndicator(): JSX.Element {
  const { data: localstackStatus } = useLocalstackStatusQuery()

  const indicatorStatus = localstackStatus
    ? SystemConfigItemStatus.running
    : SystemConfigItemStatus.failed

  return (
    <div>
      <StatusIndicator title={DOCKER_VERSION} status={indicatorStatus} className="mr-[20px]" />
    </div>
  )
}

export default DockerStatusIndicator

import { useState } from "react"

import { Toast } from "/@/components/Toast"
import StatusIndicator from "./StatusIndicator"
import {
  useLocalstackStatusQuery,
  useStartLocalStackServicesMutation,
} from "/@/hooks/useLocalstack"
import { LOCALSTACK_RUNNING_CODE, LOCALSTACK_VERSION } from "/@/constants/system"
import { SystemConfigItemStatus } from "/@/views/System"

function LocalstackStatusIndicator(): JSX.Element {
  const [open, setOpen] = useState(false)

  const startLocalstackServicesMutation = useStartLocalStackServicesMutation()
  const { data: localstackStatus } = useLocalstackStatusQuery()

  const indicatorCallback = async () => {
    startLocalstackServicesMutation.mutate()
  }

  const indicatorStatus =
    localstackStatus?.code === LOCALSTACK_RUNNING_CODE
      ? SystemConfigItemStatus.running
      : SystemConfigItemStatus.failed

  const toastTitle =
    localstackStatus?.code === LOCALSTACK_RUNNING_CODE
      ? "Starting Localstack services"
      : "Stopping Localstack services"

  return (
    <div>
      <StatusIndicator
        title={LOCALSTACK_VERSION}
        setOpen={setOpen}
        status={indicatorStatus}
        className="mr-[20px]"
        callback={indicatorCallback}
      />
      <Toast open={open} onOpenChange={setOpen} title={toastTitle} actionLabel="Dismiss" />
    </div>
  )
}

export default LocalstackStatusIndicator

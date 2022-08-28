import React, { useCallback, useReducer, useEffect } from "react"

import {
  ISystem,
  SystemConfigItem,
  defaultInitialState,
  SystemSetupAction,
  systemSetupReducer,
  SystemConfigItemStatus,
} from "./systemReducer"
import { useAsync } from "/@/hooks/useAsync"
import { dataProvider } from "/@/providers"
import {
  DOCKER_SUCCESS_RESPONSE,
  LOCALSTACK_SUCCESS_RESPONSE,
  LOCALSTACK_NETWORK_ERROR,
  LOCALSTACK_RUNNING_CODE,
  SYSTEM_CHECK_INTERVAL,
  OS_SUCCESS_RESPONSE,
} from "./constants"
import { useInterval } from "/@/hooks/useInterval"
import { setSetupConfig, formatSystemConfigPayload } from "./systemUtils"

const SystemContext = React.createContext(defaultInitialState)
SystemContext.displayName = "SystemContext"

function SystemProvider(props: any): JSX.Element {
  const [{ docker, localstack, os, systemSetupComplete }, dispatch] = useReducer(
    systemSetupReducer,
    defaultInitialState,
  )

  const { run, setData } = useAsync()

  const setStatus = useCallback(
    async (prevState: any, type: SystemSetupAction, payload: SystemConfigItem) => {
      dispatch({
        type,
        payload: { ...prevState, ...payload },
      })
    },
    [],
  )

  const systemCheck = useCallback(
    async (prevState: any, provider: any, action: SystemSetupAction, successResponse: string) => {
      setStatus(docker, action, {
        status: SystemConfigItemStatus.pending,
      })

      const response = await run(provider.installationCheck())
      setStatus(prevState, action, formatSystemConfigPayload(response, successResponse))
    },
    [docker, run, setStatus],
  )

  const localstackRunning = useCallback(async () => {
    try {
      const response = await run(dataProvider.localstack.localstackStatus())
      const { code } = response

      if (code === LOCALSTACK_NETWORK_ERROR) {
        await setStatus(localstack, SystemSetupAction.updateLocalstackStatus, {
          status: SystemConfigItemStatus.failed,
        })
      } else if (code === LOCALSTACK_RUNNING_CODE) {
        await setStatus(localstack, SystemSetupAction.updateLocalstackStatus, {
          status: SystemConfigItemStatus.running,
        })
      }
    } catch (err) {
      await setStatus(localstack, SystemSetupAction.updateLocalstackStatus, {
        status: SystemConfigItemStatus.failed,
      })
    }
  }, [run, setStatus, localstack])

  const startLocalstackServices = useCallback(async () => {
    try {
      await setStatus(localstack, SystemSetupAction.updateLocalstackStatus, {
        status: SystemConfigItemStatus.pending,
      })
      await run(dataProvider.localstack.startLocalstackServices())
    } catch (err) {
      await setStatus(localstack, SystemSetupAction.updateLocalstackStatus, {
        status: SystemConfigItemStatus.failed,
      })
    }
  }, [run, setStatus, localstack])

  const stopLocalstackServices = useCallback(async () => {
    try {
      await setStatus(localstack, SystemSetupAction.updateLocalstackStatus, {
        status: SystemConfigItemStatus.pending,
      })
      await run(dataProvider.localstack.stopLocalstackServices())
    } catch (err) {
      await setStatus(localstack, SystemSetupAction.updateLocalstackStatus, {
        status: SystemConfigItemStatus.failed,
      })
    }
  }, [run, setStatus, localstack])

  useInterval(async () => {
    await localstackRunning()
  }, SYSTEM_CHECK_INTERVAL)

  useEffect(() => {
    if (docker.status === SystemConfigItemStatus.idle) {
      systemCheck(
        docker,
        dataProvider.docker,
        SystemSetupAction.setDockerIsInstalled,
        DOCKER_SUCCESS_RESPONSE,
      )
    }

    if (
      docker.status === SystemConfigItemStatus.done &&
      localstack.status === SystemConfigItemStatus.idle
    ) {
      systemCheck(
        localstack,
        dataProvider.localstack,
        SystemSetupAction.setLocalstackIsInstalled,
        LOCALSTACK_SUCCESS_RESPONSE,
      )
    }

    if (
      docker.status === SystemConfigItemStatus.done &&
      localstack.status === SystemConfigItemStatus.done &&
      os.status === SystemConfigItemStatus.idle
    ) {
      systemCheck(os, dataProvider.os, SystemSetupAction.setOsRequirementsMet, OS_SUCCESS_RESPONSE)
    }

    if (
      docker.status === SystemConfigItemStatus.done &&
      localstack.status === SystemConfigItemStatus.done &&
      os.status === SystemConfigItemStatus.done
    ) {
      setStatus(systemSetupComplete, SystemSetupAction.setSystemSetupComplete, {
        complete: true,
      })

      setSetupConfig({
        dockerIsInstalled: true,
        localstackIsInstalled: true,
        osRequirementsMet: true,
      })
    }
  }, [docker, os, localstack, systemSetupComplete, setStatus, systemCheck])

  const value: ISystem = React.useMemo(
    () => ({
      localstack,
      docker,
      os,
      systemSetupComplete,
      setData,
      localstackRunning,
      startLocalstackServices,
      stopLocalstackServices,
    }),
    [
      docker,
      localstack,
      os,
      systemSetupComplete,
      setData,
      localstackRunning,
      startLocalstackServices,
      stopLocalstackServices,
    ],
  )

  return <SystemContext.Provider value={value} {...props} /> // eslint-disable-line
}

function useSystem(): ISystem {
  const context = React.useContext(SystemContext)
  if (context === undefined) {
    throw new Error("useSystem must be used within a SystemProvider")
  }
  return context
}

export { SystemProvider, useSystem, SystemContext }

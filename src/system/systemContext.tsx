import React, { useCallback, useReducer } from "react"

import {
  defaultInitialState,
  SystemSetupAction,
  systemSetupReducer,
  SystemConfigItemStatus,
} from "/@/system/systemReducer"
import type { ISystem } from "./systemReducer"
import { useAsync } from "/@/hooks/useAsync"
import { dataProvider } from "/@/providers"
import {
  LOCALSTACK_NETWORK_ERROR,
  LOCALSTACK_RUNNING_CODE,
  SYSTEM_CHECK_INTERVAL,
} from "./constants"
import { useInterval } from "/@/hooks/useInterval"

const SystemContext = React.createContext(defaultInitialState)
SystemContext.displayName = "SystemContext"

function SystemProvider(props: any): JSX.Element {
  const [{ docker, localstack, os }, dispatch] = useReducer(
    systemSetupReducer,
    defaultInitialState,
  )

  const { run, setData } = useAsync()

  const setStatus = useCallback(
    async (type: SystemSetupAction, status: SystemConfigItemStatus) => {
      dispatch({
        type,
        payload: { ...localstack, status },
      })
    },
    [localstack],
  )

  const localstackRunning = useCallback(async () => {
    try {
      const response = await run(dataProvider.localstack.localstackStatus())
      const { code } = response

      if (code === LOCALSTACK_NETWORK_ERROR) {
        await setStatus(SystemSetupAction.updateLocalstackStatus, SystemConfigItemStatus.failed)
      } else if (code === LOCALSTACK_RUNNING_CODE) {
        await setStatus(SystemSetupAction.updateLocalstackStatus, SystemConfigItemStatus.running)
      }
    } catch (err) {
      await setStatus(SystemSetupAction.updateLocalstackStatus, SystemConfigItemStatus.failed)
    }
  }, [run, setStatus])

  const startLocalstackServices = useCallback(async () => {
    try {
      await setStatus(SystemSetupAction.updateLocalstackStatus, SystemConfigItemStatus.waiting)
      await run(dataProvider.localstack.startLocalstackServices())
    } catch (err) {
      await setStatus(SystemSetupAction.updateLocalstackStatus, SystemConfigItemStatus.failed)
    }
  }, [run, setStatus])

  const stopLocalstackServices = useCallback(async () => {
    try {
      await setStatus(SystemSetupAction.updateLocalstackStatus, SystemConfigItemStatus.waiting)
      await run(dataProvider.localstack.stopLocalstackServices())
    } catch (err) {
      await setStatus(SystemSetupAction.updateLocalstackStatus, SystemConfigItemStatus.failed)
    }
  }, [run, setStatus])

  useInterval(async () => {
    await localstackRunning()
  }, SYSTEM_CHECK_INTERVAL)

  const value: ISystem = React.useMemo(
    () => ({
      localstack,
      docker,
      os,
      setData,
      localstackRunning,
      startLocalstackServices,
      stopLocalstackServices,
    }),
    [
      docker,
      localstack,
      os,
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

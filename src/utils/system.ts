import { invoke } from "@tauri-apps/api"

import { LOCAL_STORAGE_KEY } from "/@/constants/project"
import type { SetupConfig } from "/@/views/Setup/setupReducer"

export type ProjectStorage = {
  setupConfig: SetupConfig
}

export const getProjectStorage = (): ProjectStorage | null => {
  const config = window.localStorage.getItem(LOCAL_STORAGE_KEY)
  return config ? JSON.parse(config) : null
}

export const getSetupConfig = (): SetupConfig | null => {
  const config = getProjectStorage()
  return config ? config.setupConfig : null
}

export const setSetupConfig = (config: SetupConfig): void => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ setupConfig: config }))
}

export const systemCheck = async (command: string, success: string): Promise<boolean> => {
  return invoke(command, { name: "System Requirements Check" }).then(response => {
    let result = false
    if (response === success) {
      result = true
    }
    return result
  })
}

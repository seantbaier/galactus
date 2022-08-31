import axios from "axios"
import { invoke } from "@tauri-apps/api"

import { LOCALSTACK_ENDPOINT } from "/@/constants/config"

import {
  LOCALSTACK_START_COMMAND,
  LOCALSTACK_STOP_COMMAND,
  LOCALSTACK_NETWORK_ERROR,
  LOCALSTACK_RUNNING_CODE,
  LOCALSTACK_INSTALLED_COMMAND,
  LOCALSTACK_SUCCESS_RESPONSE,
} from "/@/constants/system"

export interface InvokeCommandResponse {
  success?: string
  error?: string
}

export interface LocalStackStatusResponse extends InvokeCommandResponse {
  code: string
}

class LocalstackProvider {
  public baseUrl: string

  public startLocalstackCommand: string

  public stopLocalstackCommand: string

  public localstackInstalledCommand: string

  public localstackSuccessResponse: string

  constructor() {
    this.baseUrl = LOCALSTACK_ENDPOINT
    this.startLocalstackCommand = LOCALSTACK_START_COMMAND
    this.stopLocalstackCommand = LOCALSTACK_STOP_COMMAND
    this.localstackInstalledCommand = LOCALSTACK_INSTALLED_COMMAND
    this.localstackSuccessResponse = LOCALSTACK_SUCCESS_RESPONSE
  }

  public installationCheck = async (): Promise<any> => {
    return invoke(this.localstackInstalledCommand, {
      name: "Checking for Localstack installation",
    })
      .then(response => {
        return Promise.resolve(response)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }

  public localstackStatus = async (): Promise<LocalStackStatusResponse> => {
    return axios
      .get(this.baseUrl)
      .then(({ status }) => {
        if (!status) {
          return Promise.reject()
        }

        let code = LOCALSTACK_NETWORK_ERROR
        if (status === 200) {
          code = LOCALSTACK_RUNNING_CODE
        }
        return Promise.resolve({ code })
      })
      .catch(err => {
        const { code } = err || {}
        // Resolving the error in order to display in the component
        return Promise.resolve({ code })
      })
  }

  public startLocalstackServices = async (): Promise<InvokeCommandResponse> => {
    return invoke<InvokeCommandResponse>(this.startLocalstackCommand, { name: "Start Localstack" })
      .then(({ success, error }) => {
        if (error) {
          return Promise.reject(error)
        }

        return Promise.resolve({ success, error })
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }

  public stopLocalstackServices = async (): Promise<any> => {
    return invoke<InvokeCommandResponse>(this.stopLocalstackCommand, { name: "Stop Localstack" })
      .then(({ success, error }) => {
        if (error) {
          return Promise.reject(error)
        }

        return Promise.resolve({ success, error })
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }
}

export default LocalstackProvider

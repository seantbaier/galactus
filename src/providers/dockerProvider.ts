import { invoke } from "@tauri-apps/api"
import axios from "axios"

import {
  DOCKER_INSTALLED_COMMAND,
  DOCKER_SUCCESS_RESPONSE,
  DOCKER_SOCKET_PATH,
  DOCKER_API_ENDPOINT,
} from "/@/constants/system"

class DockerProvider {
  public dockerInstalledCommand: string

  public dockerSuccessResponse: string

  public dockerSocketPath: string

  public dockerApiEndpoint: string

  constructor() {
    this.dockerInstalledCommand = DOCKER_INSTALLED_COMMAND
    this.dockerSuccessResponse = DOCKER_SUCCESS_RESPONSE
    this.dockerSocketPath = DOCKER_SOCKET_PATH
    this.dockerApiEndpoint = DOCKER_API_ENDPOINT
  }

  public info = async () => {
    return axios
      .get(`${this.dockerApiEndpoint}/info`, { socketPath: this.dockerSocketPath })
      .then((response: any) => {
        return Promise.resolve(response)
      })
      .catch((err: any) => Promise.reject(err))
  }

  public installationCheck = async (): Promise<any> => {
    return invoke(this.dockerInstalledCommand, {
      name: "Checking for Docker installation",
    })
      .then(response => {
        return Promise.resolve(response)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }
}

export default DockerProvider

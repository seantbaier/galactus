import { invoke } from "@tauri-apps/api"

import { DOCKER_INSTALLED_COMMAND, DOCKER_SUCCESS_RESPONSE } from "/@/constants/system"

class DockerProvider {
  public dockerInstalledCommand: string

  public dockerSuccessResponse: string

  constructor() {
    this.dockerInstalledCommand = DOCKER_INSTALLED_COMMAND
    this.dockerSuccessResponse = DOCKER_SUCCESS_RESPONSE
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

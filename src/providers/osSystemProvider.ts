import { OS_REQUIREMENTS_COMMAND, OS_SUCCESS_RESPONSE } from "/@/constants/system"

class OSSystemProvider {
  public osMeetsRequirementsCommand: string

  public osRequirementsSuccessResponse: string

  constructor() {
    this.osMeetsRequirementsCommand = OS_REQUIREMENTS_COMMAND
    this.osRequirementsSuccessResponse = OS_SUCCESS_RESPONSE
  }

  public installationCheck = async (): Promise<any> => {
    // Fake temp check
    return Promise.resolve(this.osRequirementsSuccessResponse)
  }
}

export default OSSystemProvider

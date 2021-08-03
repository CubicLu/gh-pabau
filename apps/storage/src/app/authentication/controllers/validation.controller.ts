class ValidationController {
  async checkRequiredData(payloadData) {
    const requiredParams: string[] = ['company']

    const missingParams: string[] = []
    requiredParams.map((key) => {
      if (!Object.keys(payloadData).includes(key)) {
        missingParams.push(key)
      }
    })
    return missingParams
  }
}

export default new ValidationController()

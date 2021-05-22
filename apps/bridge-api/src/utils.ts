export function stringToBoolean(value: string | number) {
  if (!value || value === '0' || value === 0) return false
  if (typeof value === 'string') {
    if (value.toLowerCase() === 'false') return false
    if (value.toLowerCase() === 'off') return false
    if (value.toLowerCase() === 'disable') return false
    if (value.toLowerCase() === 'disabled') return false
  }
  return true
}

export function loadEnvSecretFile(varName: string) {
  //TODO
}

export function assertEnvVarsExist(envVars: readonly string[]) {
  const errors = envVars.filter((e) => !process.env[e] || loadEnvSecretFile(e))
  if (errors.length > 0) {
    for (const e of errors) console.error(`You need to set a ${e}!`)

    throw new Error(
      `Terminating due to ${errors.length} error${
        errors.length > 1 ? 's' : ''
      }.`
    )
  }
}

export function truthyToMaskedString(inputString: string) {
  return inputString ? '(Set)' : '(NOT SET!!)'
}

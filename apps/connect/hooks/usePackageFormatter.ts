const getPackageStatus = (expiration_date, voided = 0) => {
  if (voided > 0) {
    return 'voided'
  }

  const a_date = new Date()
  const b_date = new Date(expiration_date)

  if (a_date > b_date) {
    return 'expired'
  }

  return 'active'
}

export const usePackageFormatter = () => {
  return {
    getPackageStatus,
  }
}

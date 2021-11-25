import dayjs from 'dayjs'

export const getFunction = (obj, path, defaultValue = undefined) => {
  const travel = (regexp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj
      )

  const result = travel(/[,[\]]+?/) || travel(/[,.[\]]+?/)
  return result === undefined || result === obj ? defaultValue : result
}

export const getDuration = (startDate, endDate) => {
  const start = dayjs(startDate)
  const end = dayjs(endDate)
  return end.diff(start, 'minutes')
}

export const prepareQueryPayload = (key: string, value: string) => {
  const mapper = {
    subject: {
      subject: {
        set: value,
      },
    },
  }
  return mapper[key]
}

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

export const getDuration = (startDate, endDate, eventDateFormat) => {
  const start = dayjs(startDate, eventDateFormat)
  const end = dayjs(endDate, eventDateFormat)
  return end.diff(start, 'minutes')
}

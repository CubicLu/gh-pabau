import dayjs from 'dayjs'

export const getFunction = (obj, path, defaultValue = undefined) => {
  // console.log('obj---------------', obj)
  const travel = (regexp) => {
    // console.log('path------------', path)
    // console.log('regexp------------', regexp)
    const a = String.prototype.split.call(path, regexp)
    // console.log('a----------------------', a)
    const b = a.filter(Boolean)
    // console.log('b----------------------', b)
    return b.reduce(
      (res, key) => (res !== null && res !== undefined ? res[key] : res),
      obj
    )
  }

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

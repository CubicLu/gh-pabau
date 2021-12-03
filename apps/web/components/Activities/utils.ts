import dayjs from 'dayjs'
import { ApolloCache } from '@apollo/client'
import { Activity_Status, ActivityCountDocument } from '@pabau/graphql'

export enum ActivityCountOperand {
  Add = 'add',
  Subtract = 'subtract',
}

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

export const updateActivityCountCache = (
  cache: ApolloCache<any>,
  operand: ActivityCountOperand
) => {
  const existing = cache.readQuery({
    query: ActivityCountDocument,
    variables: {
      status: Activity_Status.Done,
    },
  })
  if (existing) {
    const key = Object.keys(existing)[0]
    const newCount =
      operand === ActivityCountOperand.Add
        ? existing[key]?._count?.id + 1
        : existing[key]?._count?.id - 1
    cache.writeQuery({
      query: ActivityCountDocument,
      variables: {
        status: Activity_Status.Done,
      },
      data: {
        [key]: {
          ...existing[key],
          _count: {
            ...existing[key]?._count,
            id: newCount,
          },
        },
      },
    })
  }
}

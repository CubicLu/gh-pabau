import { BasicContactDetailsDocument } from '@pabau/graphql'
import { ApolloCache } from '@apollo/client'

export enum NoteCountOperandType {
  Add = 'add',
  Subtract = 'subtract',
}

export const updateClientNotesCount = (
  id: number | string,
  cache: ApolloCache<any>,
  updatedID: number | string,
  operand: NoteCountOperandType
) => {
  const queryVariables = {
    variables: {
      id: id,
    },
  }
  const existing = cache.readQuery({
    query: BasicContactDetailsDocument,
    ...queryVariables,
  })
  if (existing && updatedID) {
    const key = Object.keys(existing)[0]
    const notes = [...existing[key]['contactNotes']]
    const filteredNotes = notes?.filter((i) => i.ID !== updatedID)
    cache.writeQuery({
      query: BasicContactDetailsDocument,
      ...queryVariables,
      data: {
        [key]: {
          ...existing[key],
          contactNotes:
            operand === 'add'
              ? [
                  ...existing[key]['contactNotes'],
                  {
                    ID: updatedID,
                    __typename: 'ContactNote',
                  },
                ]
              : filteredNotes,
        },
      },
    })
  }
}

export const updateStaffAlertCount = (
  id: number | string,
  cache: ApolloCache<any>,
  updatedID: number | string,
  operand: NoteCountOperandType
) => {
  const queryVariables = {
    variables: {
      id: id,
    },
  }
  const existing = cache.readQuery({
    query: BasicContactDetailsDocument,
    ...queryVariables,
  })
  if (existing && updatedID) {
    const key = Object.keys(existing)[0]
    const alerts = [...existing[key]['staffAlerts']]
    const filteredAlerts = alerts?.filter((i) => i.ID !== updatedID)
    cache.writeQuery({
      query: BasicContactDetailsDocument,
      ...queryVariables,
      data: {
        [key]: {
          ...existing[key],
          staffAlerts:
            operand === 'add'
              ? [
                  ...existing[key]['staffAlerts'],
                  {
                    ID: updatedID,
                    __typename: 'ContactAlert',
                  },
                ]
              : filteredAlerts,
        },
      },
    })
  }
}

import { mutationField, nonNull } from 'nexus'

export const CommunicationHashCreateOneMutation = mutationField(
  'createOneCommunicationHash',
  {
    type: nonNull('CommunicationHash'),
    args: {
      data: nonNull('CommunicationHashCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.communicationHash.create({
        data,
        ...select,
      })
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const CommunicationCreateOneMutation = mutationField(
  'createOneCommunication',
  {
    type: nonNull('Communication'),
    args: {
      data: nonNull('CommunicationCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.communication.create({
        data,
        ...select,
      })
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const CommunicationHashUpdateOneMutation = mutationField(
  'updateOneCommunicationHash',
  {
    type: nonNull('CommunicationHash'),
    args: {
      data: nonNull('CommunicationHashUpdateInput'),
      where: nonNull('CommunicationHashWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.communicationHash.update({
        where,
        data,
        ...select,
      })
    },
  },
)

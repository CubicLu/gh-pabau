import { mutationField, nonNull } from 'nexus'

export const CommunicationHashUpdateOneMutation = mutationField(
  'updateOneCommunicationHash',
  {
    type: nonNull('CommunicationHash'),
    args: {
      where: nonNull('CommunicationHashWhereUniqueInput'),
      data: nonNull('CommunicationHashUpdateInput'),
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

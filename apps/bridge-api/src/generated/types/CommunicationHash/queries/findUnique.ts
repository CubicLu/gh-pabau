import { queryField, nonNull } from 'nexus'

export const CommunicationHashFindUniqueQuery = queryField(
  'findUniqueCommunicationHash',
  {
    type: 'CommunicationHash',
    args: {
      where: nonNull('CommunicationHashWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.communicationHash.findUnique({
        where,
        ...select,
      })
    },
  },
)

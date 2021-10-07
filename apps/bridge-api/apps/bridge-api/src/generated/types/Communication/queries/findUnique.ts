import { queryField, nonNull } from 'nexus'

export const CommunicationFindUniqueQuery = queryField(
  'findUniqueCommunication',
  {
    type: 'Communication',
    args: {
      where: nonNull('CommunicationWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.communication.findUnique({
        where,
        ...select,
      })
    },
  },
)

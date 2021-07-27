import { queryField, nonNull } from 'nexus'

export const CommunicationContentFindUniqueQuery = queryField(
  'findUniqueCommunicationContent',
  {
    type: 'CommunicationContent',
    args: {
      where: nonNull('CommunicationContentWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.communicationContent.findUnique({
        where,
        ...select,
      })
    },
  },
)

import { queryField, nonNull, list } from 'nexus'

export const CommunicationFindManyQuery = queryField('findManyCommunication', {
  type: nonNull(list(nonNull('Communication'))),
  args: {
    where: 'CommunicationWhereInput',
    orderBy: list('CommunicationOrderByInput'),
    cursor: 'CommunicationWhereUniqueInput',
    distinct: 'CommunicationScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.communication.findMany({
      ...args,
      ...select,
    })
  },
})

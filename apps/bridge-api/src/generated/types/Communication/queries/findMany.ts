import { queryField, nonNull, list } from 'nexus'

export const CommunicationFindManyQuery = queryField('findManyCommunication', {
  type: nonNull(list(nonNull('Communication'))),
  args: {
    where: 'CommunicationWhereInput',
    orderBy: list('CommunicationOrderByWithRelationInput'),
    cursor: 'CommunicationWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CommunicationScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.communication.findMany({
      ...args,
      ...select,
    })
  },
})

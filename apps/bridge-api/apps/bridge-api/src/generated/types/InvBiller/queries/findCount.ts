import { queryField, nonNull, list } from 'nexus'

export const InvBillerFindCountQuery = queryField('findManyInvBillerCount', {
  type: nonNull('Int'),
  args: {
    where: 'InvBillerWhereInput',
    orderBy: list('InvBillerOrderByWithRelationInput'),
    cursor: 'InvBillerWhereUniqueInput',
    distinct: 'InvBillerScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.invBiller.count(args as any)
  },
})

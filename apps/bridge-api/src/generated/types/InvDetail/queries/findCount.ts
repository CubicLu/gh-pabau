import { queryField, nonNull, list } from 'nexus'

export const InvDetailFindCountQuery = queryField('findManyInvDetailCount', {
  type: nonNull('Int'),
  args: {
    where: 'InvDetailWhereInput',
    orderBy: list('InvDetailOrderByWithRelationInput'),
    cursor: 'InvDetailWhereUniqueInput',
    distinct: 'InvDetailScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.invDetail.count(args as any)
  },
})

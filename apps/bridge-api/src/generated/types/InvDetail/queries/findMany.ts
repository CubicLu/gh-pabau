import { queryField, nonNull, list } from 'nexus'

export const InvDetailFindManyQuery = queryField('findManyInvDetail', {
  type: nonNull(list(nonNull('InvDetail'))),
  args: {
    where: 'InvDetailWhereInput',
    orderBy: list('InvDetailOrderByWithRelationInput'),
    cursor: 'InvDetailWhereUniqueInput',
    distinct: 'InvDetailScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invDetail.findMany({
      ...args,
      ...select,
    })
  },
})

import { queryField, list } from 'nexus'

export const InvDetailFindFirstQuery = queryField('findFirstInvDetail', {
  type: 'InvDetail',
  args: {
    where: 'InvDetailWhereInput',
    orderBy: list('InvDetailOrderByWithRelationInput'),
    cursor: 'InvDetailWhereUniqueInput',
    distinct: 'InvDetailScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invDetail.findFirst({
      ...args,
      ...select,
    })
  },
})

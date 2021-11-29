import { queryField, list } from 'nexus'

export const InvBillerFindFirstQuery = queryField('findFirstInvBiller', {
  type: 'InvBiller',
  args: {
    where: 'InvBillerWhereInput',
    orderBy: list('InvBillerOrderByWithRelationInput'),
    cursor: 'InvBillerWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('InvBillerScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invBiller.findFirst({
      ...args,
      ...select,
    })
  },
})

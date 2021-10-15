import { queryField, list } from 'nexus'

export const InvBillerFindFirstQuery = queryField('findFirstInvBiller', {
  type: 'InvBiller',
  args: {
    where: 'InvBillerWhereInput',
    orderBy: list('InvBillerOrderByInput'),
    cursor: 'InvBillerWhereUniqueInput',
    distinct: 'InvBillerScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invBiller.findFirst({
      ...args,
      ...select,
    })
  },
})

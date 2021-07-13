import { queryField, nonNull } from 'nexus'

export const InvBillerFindUniqueQuery = queryField('findUniqueInvBiller', {
  type: 'InvBiller',
  args: {
    where: nonNull('InvBillerWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.invBiller.findUnique({
      where,
      ...select,
    })
  },
})

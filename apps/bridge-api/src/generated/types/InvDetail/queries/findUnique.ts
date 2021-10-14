import { queryField, nonNull } from 'nexus'

export const InvDetailFindUniqueQuery = queryField('findUniqueInvDetail', {
  type: 'InvDetail',
  args: {
    where: nonNull('InvDetailWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.invDetail.findUnique({
      where,
      ...select,
    })
  },
})

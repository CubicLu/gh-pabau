import { queryField, list } from 'nexus'

export const CmExtraGymFindFirstQuery = queryField('findFirstCmExtraGym', {
  type: 'CmExtraGym',
  args: {
    where: 'CmExtraGymWhereInput',
    orderBy: list('CmExtraGymOrderByInput'),
    cursor: 'CmExtraGymWhereUniqueInput',
    distinct: 'CmExtraGymScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmExtraGym.findFirst({
      ...args,
      ...select,
    })
  },
})

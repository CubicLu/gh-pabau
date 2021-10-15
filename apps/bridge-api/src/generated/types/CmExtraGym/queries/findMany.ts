import { queryField, nonNull, list } from 'nexus'

export const CmExtraGymFindManyQuery = queryField('findManyCmExtraGym', {
  type: nonNull(list(nonNull('CmExtraGym'))),
  args: {
    where: 'CmExtraGymWhereInput',
    orderBy: list('CmExtraGymOrderByInput'),
    cursor: 'CmExtraGymWhereUniqueInput',
    distinct: 'CmExtraGymScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmExtraGym.findMany({
      ...args,
      ...select,
    })
  },
})

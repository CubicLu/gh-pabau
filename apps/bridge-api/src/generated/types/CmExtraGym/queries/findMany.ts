import { queryField, nonNull, list } from 'nexus'

export const CmExtraGymFindManyQuery = queryField('findManyCmExtraGym', {
  type: nonNull(list(nonNull('CmExtraGym'))),
  args: {
    where: 'CmExtraGymWhereInput',
    orderBy: list('CmExtraGymOrderByWithRelationInput'),
    cursor: 'CmExtraGymWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmExtraGymScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmExtraGym.findMany({
      ...args,
      ...select,
    })
  },
})

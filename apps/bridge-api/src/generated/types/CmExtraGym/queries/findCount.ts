import { queryField, nonNull, list } from 'nexus'

export const CmExtraGymFindCountQuery = queryField('findManyCmExtraGymCount', {
  type: nonNull('Int'),
  args: {
    where: 'CmExtraGymWhereInput',
    orderBy: list('CmExtraGymOrderByWithRelationInput'),
    cursor: 'CmExtraGymWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmExtraGymScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cmExtraGym.count(args as any)
  },
})

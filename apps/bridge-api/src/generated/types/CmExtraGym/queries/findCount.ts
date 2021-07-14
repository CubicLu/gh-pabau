import { queryField, nonNull, list } from 'nexus'

export const CmExtraGymFindCountQuery = queryField('findManyCmExtraGymCount', {
  type: nonNull('Int'),
  args: {
    where: 'CmExtraGymWhereInput',
    orderBy: list('CmExtraGymOrderByInput'),
    cursor: 'CmExtraGymWhereUniqueInput',
    distinct: 'CmExtraGymScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cmExtraGym.count(args as any)
  },
})

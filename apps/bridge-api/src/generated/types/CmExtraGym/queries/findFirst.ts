import { queryField, list } from 'nexus'

export const CmExtraGymFindFirstQuery = queryField('findFirstCmExtraGym', {
  type: 'CmExtraGym',
  args: {
    where: 'CmExtraGymWhereInput',
    orderBy: list('CmExtraGymOrderByWithRelationInput'),
    cursor: 'CmExtraGymWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmExtraGymScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmExtraGym.findFirst({
      ...args,
      ...select,
    })
  },
})

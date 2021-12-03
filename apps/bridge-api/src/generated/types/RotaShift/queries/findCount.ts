import { queryField, nonNull, list } from 'nexus'

export const RotaShiftFindCountQuery = queryField('findManyRotaShiftCount', {
  type: nonNull('Int'),
  args: {
    where: 'RotaShiftWhereInput',
    orderBy: list('RotaShiftOrderByWithRelationInput'),
    cursor: 'RotaShiftWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('RotaShiftScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.rotaShift.count(args as any)
  },
})

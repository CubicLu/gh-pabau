import { queryField, nonNull, list } from 'nexus'

export const RotaShiftFindCountQuery = queryField('findManyRotaShiftCount', {
  type: nonNull('Int'),
  args: {
    where: 'RotaShiftWhereInput',
    orderBy: list('RotaShiftOrderByWithRelationInput'),
    cursor: 'RotaShiftWhereUniqueInput',
    distinct: 'RotaShiftScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.rotaShift.count(args as any)
  },
})

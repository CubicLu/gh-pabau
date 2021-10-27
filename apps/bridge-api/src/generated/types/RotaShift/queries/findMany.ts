import { queryField, nonNull, list } from 'nexus'

export const RotaShiftFindManyQuery = queryField('findManyRotaShift', {
  type: nonNull(list(nonNull('RotaShift'))),
  args: {
    where: 'RotaShiftWhereInput',
    orderBy: list('RotaShiftOrderByWithRelationInput'),
    cursor: 'RotaShiftWhereUniqueInput',
    distinct: 'RotaShiftScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.rotaShift.findMany({
      ...args,
      ...select,
    })
  },
})

import { queryField, list } from 'nexus'

export const RotaShiftFindFirstQuery = queryField('findFirstRotaShift', {
  type: 'RotaShift',
  args: {
    where: 'RotaShiftWhereInput',
    orderBy: list('RotaShiftOrderByInput'),
    cursor: 'RotaShiftWhereUniqueInput',
    distinct: 'RotaShiftScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.rotaShift.findFirst({
      ...args,
      ...select,
    })
  },
})

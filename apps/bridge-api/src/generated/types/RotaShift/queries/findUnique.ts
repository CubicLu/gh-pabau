import { queryField, nonNull } from 'nexus'

export const RotaShiftFindUniqueQuery = queryField('findUniqueRotaShift', {
  type: 'RotaShift',
  args: {
    where: nonNull('RotaShiftWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.rotaShift.findUnique({
      where,
      ...select,
    })
  },
})

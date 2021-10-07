import { mutationField, nonNull } from 'nexus'

export const RotaShiftUpdateOneMutation = mutationField('updateOneRotaShift', {
  type: nonNull('RotaShift'),
  args: {
    where: nonNull('RotaShiftWhereUniqueInput'),
    data: nonNull('RotaShiftUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.rotaShift.update({
      where,
      data,
      ...select,
    })
  },
})

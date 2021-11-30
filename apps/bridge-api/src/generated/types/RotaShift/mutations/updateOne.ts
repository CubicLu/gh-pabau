import { mutationField, nonNull } from 'nexus'

export const RotaShiftUpdateOneMutation = mutationField('updateOneRotaShift', {
  type: nonNull('RotaShift'),
  args: {
    data: nonNull('RotaShiftUpdateInput'),
    where: nonNull('RotaShiftWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.rotaShift.update({
      where,
      data,
      ...select,
    })
  },
})

import { mutationField, nonNull } from 'nexus'

export const RotaShiftDeleteOneMutation = mutationField('deleteOneRotaShift', {
  type: 'RotaShift',
  args: {
    where: nonNull('RotaShiftWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.rotaShift.delete({
      where,
      ...select,
    })
  },
})

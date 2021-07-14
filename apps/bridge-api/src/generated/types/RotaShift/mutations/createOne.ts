import { mutationField, nonNull } from 'nexus'

export const RotaShiftCreateOneMutation = mutationField('createOneRotaShift', {
  type: nonNull('RotaShift'),
  args: {
    data: nonNull('RotaShiftCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.rotaShift.create({
      data,
      ...select,
    })
  },
})

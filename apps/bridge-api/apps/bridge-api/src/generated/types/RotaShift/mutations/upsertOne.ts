import { mutationField, nonNull } from 'nexus'

export const RotaShiftUpsertOneMutation = mutationField('upsertOneRotaShift', {
  type: nonNull('RotaShift'),
  args: {
    where: nonNull('RotaShiftWhereUniqueInput'),
    create: nonNull('RotaShiftCreateInput'),
    update: nonNull('RotaShiftUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.rotaShift.upsert({
      ...args,
      ...select,
    })
  },
})

import { mutationField, nonNull } from 'nexus'

export const RotaShiftUpdateManyMutation = mutationField(
  'updateManyRotaShift',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'RotaShiftWhereInput',
      data: nonNull('RotaShiftUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.rotaShift.updateMany(args as any)
    },
  },
)

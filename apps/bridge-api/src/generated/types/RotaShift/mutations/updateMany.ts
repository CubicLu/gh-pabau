import { mutationField, nonNull } from 'nexus'

export const RotaShiftUpdateManyMutation = mutationField(
  'updateManyRotaShift',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('RotaShiftUpdateManyMutationInput'),
      where: 'RotaShiftWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.rotaShift.updateMany(args as any)
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const AcLogActionUpdateManyMutation = mutationField(
  'updateManyAcLogAction',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'AcLogActionWhereInput',
      data: nonNull('AcLogActionUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.acLogAction.updateMany(args as any)
    },
  },
)

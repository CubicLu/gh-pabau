import { mutationField, nonNull } from 'nexus'

export const AcLogActionUpdateManyMutation = mutationField(
  'updateManyAcLogAction',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('AcLogActionUpdateManyMutationInput'),
      where: 'AcLogActionWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.acLogAction.updateMany(args as any)
    },
  },
)

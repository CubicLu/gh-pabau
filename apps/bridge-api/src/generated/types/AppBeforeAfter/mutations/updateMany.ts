import { mutationField, nonNull } from 'nexus'

export const AppBeforeAfterUpdateManyMutation = mutationField(
  'updateManyAppBeforeAfter',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('AppBeforeAfterUpdateManyMutationInput'),
      where: 'AppBeforeAfterWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.appBeforeAfter.updateMany(args as any)
    },
  },
)

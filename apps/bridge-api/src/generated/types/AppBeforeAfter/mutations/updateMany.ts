import { mutationField, nonNull } from 'nexus'

export const AppBeforeAfterUpdateManyMutation = mutationField(
  'updateManyAppBeforeAfter',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'AppBeforeAfterWhereInput',
      data: nonNull('AppBeforeAfterUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.appBeforeAfter.updateMany(args as any)
    },
  },
)

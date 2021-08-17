import { mutationField, nonNull } from 'nexus'

export const InvCategoryUpdateManyMutation = mutationField(
  'updateManyInvCategory',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'InvCategoryWhereInput',
      data: nonNull('InvCategoryUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.invCategory.updateMany(args as any)
    },
  },
)

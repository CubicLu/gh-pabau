import { mutationField, nonNull } from 'nexus'

export const InvCategoryUpdateManyMutation = mutationField(
  'updateManyInvCategory',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('InvCategoryUpdateManyMutationInput'),
      where: 'InvCategoryWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.invCategory.updateMany(args as any)
    },
  },
)

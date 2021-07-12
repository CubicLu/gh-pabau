import { mutationField, nonNull } from 'nexus'

export const ClassCategoryUpdateManyMutation = mutationField(
  'updateManyClassCategory',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ClassCategoryWhereInput',
      data: nonNull('ClassCategoryUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.classCategory.updateMany(args as any)
    },
  },
)

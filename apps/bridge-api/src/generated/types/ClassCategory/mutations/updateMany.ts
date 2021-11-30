import { mutationField, nonNull } from 'nexus'

export const ClassCategoryUpdateManyMutation = mutationField(
  'updateManyClassCategory',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ClassCategoryUpdateManyMutationInput'),
      where: 'ClassCategoryWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.classCategory.updateMany(args as any)
    },
  },
)

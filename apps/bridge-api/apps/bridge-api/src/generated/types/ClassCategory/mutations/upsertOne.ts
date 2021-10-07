import { mutationField, nonNull } from 'nexus'

export const ClassCategoryUpsertOneMutation = mutationField(
  'upsertOneClassCategory',
  {
    type: nonNull('ClassCategory'),
    args: {
      where: nonNull('ClassCategoryWhereUniqueInput'),
      create: nonNull('ClassCategoryCreateInput'),
      update: nonNull('ClassCategoryUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.classCategory.upsert({
        ...args,
        ...select,
      })
    },
  },
)

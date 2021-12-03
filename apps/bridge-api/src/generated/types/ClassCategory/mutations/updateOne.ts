import { mutationField, nonNull } from 'nexus'

export const ClassCategoryUpdateOneMutation = mutationField(
  'updateOneClassCategory',
  {
    type: nonNull('ClassCategory'),
    args: {
      data: nonNull('ClassCategoryUpdateInput'),
      where: nonNull('ClassCategoryWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.classCategory.update({
        where,
        data,
        ...select,
      })
    },
  },
)

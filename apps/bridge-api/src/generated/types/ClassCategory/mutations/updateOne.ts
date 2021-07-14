import { mutationField, nonNull } from 'nexus'

export const ClassCategoryUpdateOneMutation = mutationField(
  'updateOneClassCategory',
  {
    type: nonNull('ClassCategory'),
    args: {
      where: nonNull('ClassCategoryWhereUniqueInput'),
      data: nonNull('ClassCategoryUpdateInput'),
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

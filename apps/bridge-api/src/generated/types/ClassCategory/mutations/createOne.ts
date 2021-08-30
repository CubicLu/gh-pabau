import { mutationField, nonNull } from 'nexus'

export const ClassCategoryCreateOneMutation = mutationField(
  'createOneClassCategory',
  {
    type: nonNull('ClassCategory'),
    args: {
      data: nonNull('ClassCategoryCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.classCategory.create({
        data,
        ...select,
      })
    },
  },
)

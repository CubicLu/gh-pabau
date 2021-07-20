import { mutationField, nonNull } from 'nexus'

export const ClassProductUpdateOneMutation = mutationField(
  'updateOneClassProduct',
  {
    type: nonNull('ClassProduct'),
    args: {
      where: nonNull('ClassProductWhereUniqueInput'),
      data: nonNull('ClassProductUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.classProduct.update({
        where,
        data,
        ...select,
      })
    },
  },
)

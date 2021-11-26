import { mutationField, nonNull } from 'nexus'

export const ClassProductUpdateOneMutation = mutationField(
  'updateOneClassProduct',
  {
    type: nonNull('ClassProduct'),
    args: {
      data: nonNull('ClassProductUpdateInput'),
      where: nonNull('ClassProductWhereUniqueInput'),
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

import { queryField, nonNull } from 'nexus'

export const ClassProductFindUniqueQuery = queryField(
  'findUniqueClassProduct',
  {
    type: 'ClassProduct',
    args: {
      where: nonNull('ClassProductWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.classProduct.findUnique({
        where,
        ...select,
      })
    },
  },
)

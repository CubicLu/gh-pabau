import { mutationField, nonNull } from 'nexus'

export const ClassProductUpsertOneMutation = mutationField(
  'upsertOneClassProduct',
  {
    type: nonNull('ClassProduct'),
    args: {
      where: nonNull('ClassProductWhereUniqueInput'),
      create: nonNull('ClassProductCreateInput'),
      update: nonNull('ClassProductUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.classProduct.upsert({
        ...args,
        ...select,
      })
    },
  },
)

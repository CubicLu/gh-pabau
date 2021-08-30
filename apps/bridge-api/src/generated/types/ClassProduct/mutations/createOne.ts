import { mutationField, nonNull } from 'nexus'

export const ClassProductCreateOneMutation = mutationField(
  'createOneClassProduct',
  {
    type: nonNull('ClassProduct'),
    args: {
      data: nonNull('ClassProductCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.classProduct.create({
        data,
        ...select,
      })
    },
  },
)

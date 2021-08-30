import { mutationField, nonNull } from 'nexus'

export const ClassProductUpdateManyMutation = mutationField(
  'updateManyClassProduct',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ClassProductWhereInput',
      data: nonNull('ClassProductUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.classProduct.updateMany(args as any)
    },
  },
)

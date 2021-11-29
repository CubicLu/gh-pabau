import { mutationField, nonNull } from 'nexus'

export const ClassProductUpdateManyMutation = mutationField(
  'updateManyClassProduct',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ClassProductUpdateManyMutationInput'),
      where: 'ClassProductWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.classProduct.updateMany(args as any)
    },
  },
)

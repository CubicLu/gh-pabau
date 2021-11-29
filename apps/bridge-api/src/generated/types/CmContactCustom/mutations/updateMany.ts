import { mutationField, nonNull } from 'nexus'

export const CmContactCustomUpdateManyMutation = mutationField(
  'updateManyCmContactCustom',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CmContactCustomUpdateManyMutationInput'),
      where: 'CmContactCustomWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmContactCustom.updateMany(args as any)
    },
  },
)

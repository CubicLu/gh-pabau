import { mutationField, nonNull } from 'nexus'

export const CmContactCustomUpdateManyMutation = mutationField(
  'updateManyCmContactCustom',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CmContactCustomWhereInput',
      data: nonNull('CmContactCustomUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmContactCustom.updateMany(args as any)
    },
  },
)

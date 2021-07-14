import { mutationField, nonNull } from 'nexus'

export const CmContactUpdateManyMutation = mutationField(
  'updateManyCmContact',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CmContactWhereInput',
      data: nonNull('CmContactUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmContact.updateMany(args as any)
    },
  },
)

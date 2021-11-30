import { mutationField, nonNull } from 'nexus'

export const CmContactUpdateManyMutation = mutationField(
  'updateManyCmContact',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CmContactUpdateManyMutationInput'),
      where: 'CmContactWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmContact.updateMany(args as any)
    },
  },
)

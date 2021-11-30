import { mutationField, nonNull } from 'nexus'

export const CmContactJsonUpdateManyMutation = mutationField(
  'updateManyCmContactJson',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CmContactJsonUpdateManyMutationInput'),
      where: 'CmContactJsonWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmContactJson.updateMany(args as any)
    },
  },
)

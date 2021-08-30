import { mutationField, nonNull } from 'nexus'

export const CmContactJsonUpdateManyMutation = mutationField(
  'updateManyCmContactJson',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CmContactJsonWhereInput',
      data: nonNull('CmContactJsonUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmContactJson.updateMany(args as any)
    },
  },
)

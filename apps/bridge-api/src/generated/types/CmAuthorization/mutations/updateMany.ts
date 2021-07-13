import { mutationField, nonNull } from 'nexus'

export const CmAuthorizationUpdateManyMutation = mutationField(
  'updateManyCmAuthorization',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CmAuthorizationWhereInput',
      data: nonNull('CmAuthorizationUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmAuthorization.updateMany(args as any)
    },
  },
)

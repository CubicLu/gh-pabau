import { mutationField, nonNull } from 'nexus'

export const CmAuthorizationUpdateManyMutation = mutationField(
  'updateManyCmAuthorization',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CmAuthorizationUpdateManyMutationInput'),
      where: 'CmAuthorizationWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmAuthorization.updateMany(args as any)
    },
  },
)

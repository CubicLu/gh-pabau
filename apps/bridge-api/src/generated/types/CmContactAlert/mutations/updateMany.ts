import { mutationField, nonNull } from 'nexus'

export const CmContactAlertUpdateManyMutation = mutationField(
  'updateManyCmContactAlert',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CmContactAlertWhereInput',
      data: nonNull('CmContactAlertUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmContactAlert.updateMany(args as any)
    },
  },
)

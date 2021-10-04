import { mutationField, nonNull } from 'nexus'

export const ContactAlertUpdateManyMutation = mutationField(
  'updateManyContactAlert',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ContactAlertWhereInput',
      data: nonNull('ContactAlertUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.contactAlert.updateMany(args as any)
    },
  },
)

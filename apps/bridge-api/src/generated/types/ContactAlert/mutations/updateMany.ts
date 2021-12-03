import { mutationField, nonNull } from 'nexus'

export const ContactAlertUpdateManyMutation = mutationField(
  'updateManyContactAlert',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ContactAlertUpdateManyMutationInput'),
      where: 'ContactAlertWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.contactAlert.updateMany(args as any)
    },
  },
)

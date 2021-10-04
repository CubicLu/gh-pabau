import { mutationField, nonNull } from 'nexus'

export const ContactAlertUpsertOneMutation = mutationField(
  'upsertOneContactAlert',
  {
    type: nonNull('ContactAlert'),
    args: {
      where: nonNull('ContactAlertWhereUniqueInput'),
      create: nonNull('ContactAlertCreateInput'),
      update: nonNull('ContactAlertUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactAlert.upsert({
        ...args,
        ...select,
      })
    },
  },
)

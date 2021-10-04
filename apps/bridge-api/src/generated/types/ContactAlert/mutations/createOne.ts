import { mutationField, nonNull } from 'nexus'

export const ContactAlertCreateOneMutation = mutationField(
  'createOneContactAlert',
  {
    type: nonNull('ContactAlert'),
    args: {
      data: nonNull('ContactAlertCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.contactAlert.create({
        data,
        ...select,
      })
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const ContactAlertUpdateOneMutation = mutationField(
  'updateOneContactAlert',
  {
    type: nonNull('ContactAlert'),
    args: {
      data: nonNull('ContactAlertUpdateInput'),
      where: nonNull('ContactAlertWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.contactAlert.update({
        where,
        data,
        ...select,
      })
    },
  },
)

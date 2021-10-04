import { mutationField, nonNull } from 'nexus'

export const ContactAlertUpdateOneMutation = mutationField(
  'updateOneContactAlert',
  {
    type: nonNull('ContactAlert'),
    args: {
      where: nonNull('ContactAlertWhereUniqueInput'),
      data: nonNull('ContactAlertUpdateInput'),
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

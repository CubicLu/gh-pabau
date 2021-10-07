import { mutationField, nonNull } from 'nexus'

export const ContactAlertDeleteOneMutation = mutationField(
  'deleteOneContactAlert',
  {
    type: 'ContactAlert',
    args: {
      where: nonNull('ContactAlertWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.contactAlert.delete({
        where,
        ...select,
      })
    },
  },
)

import { queryField, nonNull } from 'nexus'

export const ContactAlertFindUniqueQuery = queryField(
  'findUniqueContactAlert',
  {
    type: 'ContactAlert',
    args: {
      where: nonNull('ContactAlertWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.contactAlert.findUnique({
        where,
        ...select,
      })
    },
  },
)

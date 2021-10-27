import { queryField, nonNull } from 'nexus'

export const ContactPreferenceFindUniqueQuery = queryField(
  'findUniqueContactPreference',
  {
    type: 'ContactPreference',
    args: {
      where: nonNull('ContactPreferenceWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.contactPreference.findUnique({
        where,
        ...select,
      })
    },
  },
)

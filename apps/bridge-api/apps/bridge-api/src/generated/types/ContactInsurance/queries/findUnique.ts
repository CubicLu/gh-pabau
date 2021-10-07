import { queryField, nonNull } from 'nexus'

export const ContactInsuranceFindUniqueQuery = queryField(
  'findUniqueContactInsurance',
  {
    type: 'ContactInsurance',
    args: {
      where: nonNull('ContactInsuranceWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.contactInsurance.findUnique({
        where,
        ...select,
      })
    },
  },
)

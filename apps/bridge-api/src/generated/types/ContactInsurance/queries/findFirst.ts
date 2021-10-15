import { queryField, list } from 'nexus'

export const ContactInsuranceFindFirstQuery = queryField(
  'findFirstContactInsurance',
  {
    type: 'ContactInsurance',
    args: {
      where: 'ContactInsuranceWhereInput',
      orderBy: list('ContactInsuranceOrderByInput'),
      cursor: 'ContactInsuranceWhereUniqueInput',
      distinct: 'ContactInsuranceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactInsurance.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

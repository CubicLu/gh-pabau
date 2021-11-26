import { queryField, list } from 'nexus'

export const ContactInsuranceFindFirstQuery = queryField(
  'findFirstContactInsurance',
  {
    type: 'ContactInsurance',
    args: {
      where: 'ContactInsuranceWhereInput',
      orderBy: list('ContactInsuranceOrderByWithRelationInput'),
      cursor: 'ContactInsuranceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ContactInsuranceScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactInsurance.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

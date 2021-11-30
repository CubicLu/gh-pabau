import { queryField, nonNull, list } from 'nexus'

export const ContactInsuranceFindManyQuery = queryField(
  'findManyContactInsurance',
  {
    type: nonNull(list(nonNull('ContactInsurance'))),
    args: {
      where: 'ContactInsuranceWhereInput',
      orderBy: list('ContactInsuranceOrderByWithRelationInput'),
      cursor: 'ContactInsuranceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ContactInsuranceScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactInsurance.findMany({
        ...args,
        ...select,
      })
    },
  },
)

import { queryField, nonNull, list } from 'nexus'

export const ContactInsuranceFindCountQuery = queryField(
  'findManyContactInsuranceCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ContactInsuranceWhereInput',
      orderBy: list('ContactInsuranceOrderByWithRelationInput'),
      cursor: 'ContactInsuranceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ContactInsuranceScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.contactInsurance.count(args as any)
    },
  },
)

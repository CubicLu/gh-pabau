import { queryField, nonNull, list } from 'nexus'

export const ContactInsuranceFindCountQuery = queryField(
  'findManyContactInsuranceCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ContactInsuranceWhereInput',
      orderBy: list('ContactInsuranceOrderByWithRelationInput'),
      cursor: 'ContactInsuranceWhereUniqueInput',
      distinct: 'ContactInsuranceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.contactInsurance.count(args as any)
    },
  },
)

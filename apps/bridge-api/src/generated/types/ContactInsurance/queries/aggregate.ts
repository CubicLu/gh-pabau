import { queryField, list } from 'nexus'

export const ContactInsuranceAggregateQuery = queryField(
  'aggregateContactInsurance',
  {
    type: 'AggregateContactInsurance',
    args: {
      where: 'ContactInsuranceWhereInput',
      orderBy: list('ContactInsuranceOrderByInput'),
      cursor: 'ContactInsuranceWhereUniqueInput',
      distinct: 'ContactInsuranceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactInsurance.aggregate({ ...args, ...select }) as any
    },
  },
)

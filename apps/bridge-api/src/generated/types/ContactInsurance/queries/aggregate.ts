import { queryField, list } from 'nexus'

export const ContactInsuranceAggregateQuery = queryField(
  'aggregateContactInsurance',
  {
    type: 'AggregateContactInsurance',
    args: {
      where: 'ContactInsuranceWhereInput',
      orderBy: list('ContactInsuranceOrderByWithRelationInput'),
      cursor: 'ContactInsuranceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactInsurance.aggregate({ ...args, ...select }) as any
    },
  },
)

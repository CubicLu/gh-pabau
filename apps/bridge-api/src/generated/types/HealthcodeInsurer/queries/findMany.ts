import { queryField, nonNull, list } from 'nexus'

export const HealthcodeInsurerFindManyQuery = queryField(
  'findManyHealthcodeInsurer',
  {
    type: nonNull(list(nonNull('HealthcodeInsurer'))),
    args: {
      where: 'HealthcodeInsurerWhereInput',
      orderBy: list('HealthcodeInsurerOrderByInput'),
      cursor: 'HealthcodeInsurerWhereUniqueInput',
      distinct: 'HealthcodeInsurerScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.healthcodeInsurer.findMany({
        ...args,
        ...select,
      })
    },
  },
)

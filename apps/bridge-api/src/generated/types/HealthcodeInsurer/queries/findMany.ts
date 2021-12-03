import { queryField, nonNull, list } from 'nexus'

export const HealthcodeInsurerFindManyQuery = queryField(
  'findManyHealthcodeInsurer',
  {
    type: nonNull(list(nonNull('HealthcodeInsurer'))),
    args: {
      where: 'HealthcodeInsurerWhereInput',
      orderBy: list('HealthcodeInsurerOrderByWithRelationInput'),
      cursor: 'HealthcodeInsurerWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('HealthcodeInsurerScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.healthcodeInsurer.findMany({
        ...args,
        ...select,
      })
    },
  },
)

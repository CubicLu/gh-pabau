import { queryField, list } from 'nexus'

export const HealthcodeInsurerFindFirstQuery = queryField(
  'findFirstHealthcodeInsurer',
  {
    type: 'HealthcodeInsurer',
    args: {
      where: 'HealthcodeInsurerWhereInput',
      orderBy: list('HealthcodeInsurerOrderByInput'),
      cursor: 'HealthcodeInsurerWhereUniqueInput',
      distinct: 'HealthcodeInsurerScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.healthcodeInsurer.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

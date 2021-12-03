import { queryField, list } from 'nexus'

export const HealthcodeInsurerFindFirstQuery = queryField(
  'findFirstHealthcodeInsurer',
  {
    type: 'HealthcodeInsurer',
    args: {
      where: 'HealthcodeInsurerWhereInput',
      orderBy: list('HealthcodeInsurerOrderByWithRelationInput'),
      cursor: 'HealthcodeInsurerWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('HealthcodeInsurerScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.healthcodeInsurer.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

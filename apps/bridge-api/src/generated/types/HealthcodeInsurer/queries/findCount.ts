import { queryField, nonNull, list } from 'nexus'

export const HealthcodeInsurerFindCountQuery = queryField(
  'findManyHealthcodeInsurerCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'HealthcodeInsurerWhereInput',
      orderBy: list('HealthcodeInsurerOrderByWithRelationInput'),
      cursor: 'HealthcodeInsurerWhereUniqueInput',
      distinct: 'HealthcodeInsurerScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.healthcodeInsurer.count(args as any)
    },
  },
)

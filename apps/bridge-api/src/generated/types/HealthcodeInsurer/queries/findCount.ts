import { queryField, nonNull, list } from 'nexus'

export const HealthcodeInsurerFindCountQuery = queryField(
  'findManyHealthcodeInsurerCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'HealthcodeInsurerWhereInput',
      orderBy: list('HealthcodeInsurerOrderByWithRelationInput'),
      cursor: 'HealthcodeInsurerWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('HealthcodeInsurerScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.healthcodeInsurer.count(args as any)
    },
  },
)

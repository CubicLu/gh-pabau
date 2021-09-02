import { queryField, nonNull, list } from 'nexus'

export const AutomationDelayFindCountQuery = queryField(
  'findManyAutomationDelayCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AutomationDelayWhereInput',
      orderBy: list('AutomationDelayOrderByWithRelationInput'),
      cursor: 'AutomationDelayWhereUniqueInput',
      distinct: 'AutomationDelayScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.automationDelay.count(args as any)
    },
  },
)

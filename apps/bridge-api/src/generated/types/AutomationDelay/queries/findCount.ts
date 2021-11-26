import { queryField, nonNull, list } from 'nexus'

export const AutomationDelayFindCountQuery = queryField(
  'findManyAutomationDelayCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AutomationDelayWhereInput',
      orderBy: list('AutomationDelayOrderByWithRelationInput'),
      cursor: 'AutomationDelayWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AutomationDelayScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.automationDelay.count(args as any)
    },
  },
)

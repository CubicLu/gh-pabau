import { queryField, nonNull, list } from 'nexus'

export const AutomationLogFindCountQuery = queryField(
  'findManyAutomationLogCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AutomationLogWhereInput',
      orderBy: list('AutomationLogOrderByWithRelationInput'),
      cursor: 'AutomationLogWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AutomationLogScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.automationLog.count(args as any)
    },
  },
)

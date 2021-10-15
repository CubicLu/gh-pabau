import { queryField, nonNull, list } from 'nexus'

export const AutomationLogFindCountQuery = queryField(
  'findManyAutomationLogCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AutomationLogWhereInput',
      orderBy: list('AutomationLogOrderByInput'),
      cursor: 'AutomationLogWhereUniqueInput',
      distinct: 'AutomationLogScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.automationLog.count(args as any)
    },
  },
)

import { queryField, list } from 'nexus'

export const AutomationLogAggregateQuery = queryField(
  'aggregateAutomationLog',
  {
    type: 'AggregateAutomationLog',
    args: {
      where: 'AutomationLogWhereInput',
      orderBy: list('AutomationLogOrderByInput'),
      cursor: 'AutomationLogWhereUniqueInput',
      distinct: 'AutomationLogScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationLog.aggregate({ ...args, ...select }) as any
    },
  },
)

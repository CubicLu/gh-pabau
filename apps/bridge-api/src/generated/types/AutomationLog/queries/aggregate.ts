import { queryField, list } from 'nexus'

export const AutomationLogAggregateQuery = queryField(
  'aggregateAutomationLog',
  {
    type: 'AggregateAutomationLog',
    args: {
      where: 'AutomationLogWhereInput',
      orderBy: list('AutomationLogOrderByWithRelationInput'),
      cursor: 'AutomationLogWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationLog.aggregate({ ...args, ...select }) as any
    },
  },
)

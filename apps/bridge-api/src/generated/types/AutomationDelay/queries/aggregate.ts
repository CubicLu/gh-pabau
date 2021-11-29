import { queryField, list } from 'nexus'

export const AutomationDelayAggregateQuery = queryField(
  'aggregateAutomationDelay',
  {
    type: 'AggregateAutomationDelay',
    args: {
      where: 'AutomationDelayWhereInput',
      orderBy: list('AutomationDelayOrderByWithRelationInput'),
      cursor: 'AutomationDelayWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationDelay.aggregate({ ...args, ...select }) as any
    },
  },
)

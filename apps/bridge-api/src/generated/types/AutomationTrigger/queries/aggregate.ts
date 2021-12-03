import { queryField, list } from 'nexus'

export const AutomationTriggerAggregateQuery = queryField(
  'aggregateAutomationTrigger',
  {
    type: 'AggregateAutomationTrigger',
    args: {
      where: 'AutomationTriggerWhereInput',
      orderBy: list('AutomationTriggerOrderByWithRelationInput'),
      cursor: 'AutomationTriggerWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationTrigger.aggregate({ ...args, ...select }) as any
    },
  },
)

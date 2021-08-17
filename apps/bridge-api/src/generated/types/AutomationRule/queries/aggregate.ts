import { queryField, list } from 'nexus'

export const AutomationRuleAggregateQuery = queryField(
  'aggregateAutomationRule',
  {
    type: 'AggregateAutomationRule',
    args: {
      where: 'AutomationRuleWhereInput',
      orderBy: list('AutomationRuleOrderByInput'),
      cursor: 'AutomationRuleWhereUniqueInput',
      distinct: 'AutomationRuleScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationRule.aggregate({ ...args, ...select }) as any
    },
  },
)

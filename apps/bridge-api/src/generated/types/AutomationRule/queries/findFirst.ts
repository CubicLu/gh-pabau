import { queryField, list } from 'nexus'

export const AutomationRuleFindFirstQuery = queryField(
  'findFirstAutomationRule',
  {
    type: 'AutomationRule',
    args: {
      where: 'AutomationRuleWhereInput',
      orderBy: list('AutomationRuleOrderByInput'),
      cursor: 'AutomationRuleWhereUniqueInput',
      distinct: 'AutomationRuleScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationRule.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

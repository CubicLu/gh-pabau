import { queryField, list } from 'nexus'

export const AutomationRuleFindFirstQuery = queryField(
  'findFirstAutomationRule',
  {
    type: 'AutomationRule',
    args: {
      where: 'AutomationRuleWhereInput',
      orderBy: list('AutomationRuleOrderByWithRelationInput'),
      cursor: 'AutomationRuleWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AutomationRuleScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationRule.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

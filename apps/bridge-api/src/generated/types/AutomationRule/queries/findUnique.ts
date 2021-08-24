import { queryField, nonNull } from 'nexus'

export const AutomationRuleFindUniqueQuery = queryField(
  'findUniqueAutomationRule',
  {
    type: 'AutomationRule',
    args: {
      where: nonNull('AutomationRuleWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.automationRule.findUnique({
        where,
        ...select,
      })
    },
  },
)

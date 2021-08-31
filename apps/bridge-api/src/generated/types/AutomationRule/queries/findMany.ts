import { queryField, nonNull, list } from 'nexus'

export const AutomationRuleFindManyQuery = queryField(
  'findManyAutomationRule',
  {
    type: nonNull(list(nonNull('AutomationRule'))),
    args: {
      where: 'AutomationRuleWhereInput',
      orderBy: list('AutomationRuleOrderByWithRelationInput'),
      cursor: 'AutomationRuleWhereUniqueInput',
      distinct: 'AutomationRuleScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationRule.findMany({
        ...args,
        ...select,
      })
    },
  },
)

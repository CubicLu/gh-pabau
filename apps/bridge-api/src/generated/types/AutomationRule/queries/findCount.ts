import { queryField, nonNull, list } from 'nexus'

export const AutomationRuleFindCountQuery = queryField(
  'findManyAutomationRuleCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AutomationRuleWhereInput',
      orderBy: list('AutomationRuleOrderByWithRelationInput'),
      cursor: 'AutomationRuleWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AutomationRuleScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.automationRule.count(args as any)
    },
  },
)

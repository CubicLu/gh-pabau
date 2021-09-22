import { queryField, nonNull, list } from 'nexus'

export const AutomationTriggerFindCountQuery = queryField(
  'findManyAutomationTriggerCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AutomationTriggerWhereInput',
      orderBy: list('AutomationTriggerOrderByWithRelationInput'),
      cursor: 'AutomationTriggerWhereUniqueInput',
      distinct: 'AutomationTriggerScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.automationTrigger.count(args as any)
    },
  },
)

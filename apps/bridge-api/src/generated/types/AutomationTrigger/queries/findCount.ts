import { queryField, nonNull, list } from 'nexus'

export const AutomationTriggerFindCountQuery = queryField(
  'findManyAutomationTriggerCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AutomationTriggerWhereInput',
      orderBy: list('AutomationTriggerOrderByWithRelationInput'),
      cursor: 'AutomationTriggerWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AutomationTriggerScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.automationTrigger.count(args as any)
    },
  },
)

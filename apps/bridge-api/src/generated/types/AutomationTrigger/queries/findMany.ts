import { queryField, nonNull, list } from 'nexus'

export const AutomationTriggerFindManyQuery = queryField(
  'findManyAutomationTrigger',
  {
    type: nonNull(list(nonNull('AutomationTrigger'))),
    args: {
      where: 'AutomationTriggerWhereInput',
      orderBy: list('AutomationTriggerOrderByWithRelationInput'),
      cursor: 'AutomationTriggerWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AutomationTriggerScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationTrigger.findMany({
        ...args,
        ...select,
      })
    },
  },
)

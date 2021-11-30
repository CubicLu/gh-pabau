import { queryField, list } from 'nexus'

export const AutomationTriggerFindFirstQuery = queryField(
  'findFirstAutomationTrigger',
  {
    type: 'AutomationTrigger',
    args: {
      where: 'AutomationTriggerWhereInput',
      orderBy: list('AutomationTriggerOrderByWithRelationInput'),
      cursor: 'AutomationTriggerWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AutomationTriggerScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationTrigger.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

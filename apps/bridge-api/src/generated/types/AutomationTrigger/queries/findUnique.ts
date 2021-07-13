import { queryField, nonNull } from 'nexus'

export const AutomationTriggerFindUniqueQuery = queryField(
  'findUniqueAutomationTrigger',
  {
    type: 'AutomationTrigger',
    args: {
      where: nonNull('AutomationTriggerWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.automationTrigger.findUnique({
        where,
        ...select,
      })
    },
  },
)

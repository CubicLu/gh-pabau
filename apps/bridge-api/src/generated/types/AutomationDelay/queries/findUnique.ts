import { queryField, nonNull } from 'nexus'

export const AutomationDelayFindUniqueQuery = queryField(
  'findUniqueAutomationDelay',
  {
    type: 'AutomationDelay',
    args: {
      where: nonNull('AutomationDelayWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.automationDelay.findUnique({
        where,
        ...select,
      })
    },
  },
)

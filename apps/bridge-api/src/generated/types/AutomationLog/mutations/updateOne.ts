import { mutationField, nonNull } from 'nexus'

export const AutomationLogUpdateOneMutation = mutationField(
  'updateOneAutomationLog',
  {
    type: nonNull('AutomationLog'),
    args: {
      data: nonNull('AutomationLogUpdateInput'),
      where: nonNull('AutomationLogWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.automationLog.update({
        where,
        data,
        ...select,
      })
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const AutomationLogUpdateOneMutation = mutationField(
  'updateOneAutomationLog',
  {
    type: nonNull('AutomationLog'),
    args: {
      where: nonNull('AutomationLogWhereUniqueInput'),
      data: nonNull('AutomationLogUpdateInput'),
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

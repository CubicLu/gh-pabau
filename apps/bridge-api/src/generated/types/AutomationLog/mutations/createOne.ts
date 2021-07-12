import { mutationField, nonNull } from 'nexus'

export const AutomationLogCreateOneMutation = mutationField(
  'createOneAutomationLog',
  {
    type: nonNull('AutomationLog'),
    args: {
      data: nonNull('AutomationLogCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.automationLog.create({
        data,
        ...select,
      })
    },
  },
)

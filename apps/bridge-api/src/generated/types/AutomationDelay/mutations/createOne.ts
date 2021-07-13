import { mutationField, nonNull } from 'nexus'

export const AutomationDelayCreateOneMutation = mutationField(
  'createOneAutomationDelay',
  {
    type: nonNull('AutomationDelay'),
    args: {
      data: nonNull('AutomationDelayCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.automationDelay.create({
        data,
        ...select,
      })
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const AutomationTriggerCreateOneMutation = mutationField(
  'createOneAutomationTrigger',
  {
    type: nonNull('AutomationTrigger'),
    args: {
      data: nonNull('AutomationTriggerCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.automationTrigger.create({
        data,
        ...select,
      })
    },
  },
)

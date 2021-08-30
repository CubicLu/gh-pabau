import { mutationField, nonNull } from 'nexus'

export const AutomationActionCreateOneMutation = mutationField(
  'createOneAutomationAction',
  {
    type: nonNull('AutomationAction'),
    args: {
      data: nonNull('AutomationActionCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.automationAction.create({
        data,
        ...select,
      })
    },
  },
)

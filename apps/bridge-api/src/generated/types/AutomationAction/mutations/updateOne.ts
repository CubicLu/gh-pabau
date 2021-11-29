import { mutationField, nonNull } from 'nexus'

export const AutomationActionUpdateOneMutation = mutationField(
  'updateOneAutomationAction',
  {
    type: nonNull('AutomationAction'),
    args: {
      data: nonNull('AutomationActionUpdateInput'),
      where: nonNull('AutomationActionWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.automationAction.update({
        where,
        data,
        ...select,
      })
    },
  },
)

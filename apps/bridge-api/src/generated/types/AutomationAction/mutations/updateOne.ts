import { mutationField, nonNull } from 'nexus'

export const AutomationActionUpdateOneMutation = mutationField(
  'updateOneAutomationAction',
  {
    type: nonNull('AutomationAction'),
    args: {
      where: nonNull('AutomationActionWhereUniqueInput'),
      data: nonNull('AutomationActionUpdateInput'),
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

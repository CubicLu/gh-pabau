import { mutationField, nonNull } from 'nexus'

export const AutomationTriggerDeleteOneMutation = mutationField(
  'deleteOneAutomationTrigger',
  {
    type: 'AutomationTrigger',
    args: {
      where: nonNull('AutomationTriggerWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.automationTrigger.delete({
        where,
        ...select,
      })
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const AutomationDelayDeleteOneMutation = mutationField(
  'deleteOneAutomationDelay',
  {
    type: 'AutomationDelay',
    args: {
      where: nonNull('AutomationDelayWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.automationDelay.delete({
        where,
        ...select,
      })
    },
  },
)

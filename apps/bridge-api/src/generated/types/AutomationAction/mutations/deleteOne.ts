import { mutationField, nonNull } from 'nexus'

export const AutomationActionDeleteOneMutation = mutationField(
  'deleteOneAutomationAction',
  {
    type: 'AutomationAction',
    args: {
      where: nonNull('AutomationActionWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.automationAction.delete({
        where,
        ...select,
      })
    },
  },
)

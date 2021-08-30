import { mutationField, nonNull } from 'nexus'

export const AutomationLogDeleteOneMutation = mutationField(
  'deleteOneAutomationLog',
  {
    type: 'AutomationLog',
    args: {
      where: nonNull('AutomationLogWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.automationLog.delete({
        where,
        ...select,
      })
    },
  },
)

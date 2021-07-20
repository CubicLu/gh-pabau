import { mutationField, nonNull } from 'nexus'

export const AutomationRuleDeleteOneMutation = mutationField(
  'deleteOneAutomationRule',
  {
    type: 'AutomationRule',
    args: {
      where: nonNull('AutomationRuleWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.automationRule.delete({
        where,
        ...select,
      })
    },
  },
)

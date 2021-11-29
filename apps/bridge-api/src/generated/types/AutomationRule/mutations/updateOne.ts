import { mutationField, nonNull } from 'nexus'

export const AutomationRuleUpdateOneMutation = mutationField(
  'updateOneAutomationRule',
  {
    type: nonNull('AutomationRule'),
    args: {
      data: nonNull('AutomationRuleUpdateInput'),
      where: nonNull('AutomationRuleWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.automationRule.update({
        where,
        data,
        ...select,
      })
    },
  },
)

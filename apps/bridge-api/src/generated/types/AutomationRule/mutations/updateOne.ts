import { mutationField, nonNull } from 'nexus'

export const AutomationRuleUpdateOneMutation = mutationField(
  'updateOneAutomationRule',
  {
    type: nonNull('AutomationRule'),
    args: {
      where: nonNull('AutomationRuleWhereUniqueInput'),
      data: nonNull('AutomationRuleUpdateInput'),
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

import { mutationField, nonNull } from 'nexus'

export const AutomationRuleCreateOneMutation = mutationField(
  'createOneAutomationRule',
  {
    type: nonNull('AutomationRule'),
    args: {
      data: nonNull('AutomationRuleCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.automationRule.create({
        data,
        ...select,
      })
    },
  },
)

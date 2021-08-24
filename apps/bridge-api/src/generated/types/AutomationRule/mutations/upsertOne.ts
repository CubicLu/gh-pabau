import { mutationField, nonNull } from 'nexus'

export const AutomationRuleUpsertOneMutation = mutationField(
  'upsertOneAutomationRule',
  {
    type: nonNull('AutomationRule'),
    args: {
      where: nonNull('AutomationRuleWhereUniqueInput'),
      create: nonNull('AutomationRuleCreateInput'),
      update: nonNull('AutomationRuleUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationRule.upsert({
        ...args,
        ...select,
      })
    },
  },
)

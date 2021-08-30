import { mutationField, nonNull } from 'nexus'

export const AutomationRuleUpdateManyMutation = mutationField(
  'updateManyAutomationRule',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'AutomationRuleWhereInput',
      data: nonNull('AutomationRuleUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.automationRule.updateMany(args as any)
    },
  },
)

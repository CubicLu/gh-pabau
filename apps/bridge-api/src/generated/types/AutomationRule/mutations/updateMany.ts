import { mutationField, nonNull } from 'nexus'

export const AutomationRuleUpdateManyMutation = mutationField(
  'updateManyAutomationRule',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('AutomationRuleUpdateManyMutationInput'),
      where: 'AutomationRuleWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.automationRule.updateMany(args as any)
    },
  },
)

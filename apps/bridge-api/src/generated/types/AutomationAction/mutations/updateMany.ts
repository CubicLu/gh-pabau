import { mutationField, nonNull } from 'nexus'

export const AutomationActionUpdateManyMutation = mutationField(
  'updateManyAutomationAction',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'AutomationActionWhereInput',
      data: nonNull('AutomationActionUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.automationAction.updateMany(args as any)
    },
  },
)

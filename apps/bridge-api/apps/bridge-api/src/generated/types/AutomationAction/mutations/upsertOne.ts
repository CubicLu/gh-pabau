import { mutationField, nonNull } from 'nexus'

export const AutomationActionUpsertOneMutation = mutationField(
  'upsertOneAutomationAction',
  {
    type: nonNull('AutomationAction'),
    args: {
      where: nonNull('AutomationActionWhereUniqueInput'),
      create: nonNull('AutomationActionCreateInput'),
      update: nonNull('AutomationActionUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationAction.upsert({
        ...args,
        ...select,
      })
    },
  },
)

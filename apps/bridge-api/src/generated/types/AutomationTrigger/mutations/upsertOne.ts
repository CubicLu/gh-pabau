import { mutationField, nonNull } from 'nexus'

export const AutomationTriggerUpsertOneMutation = mutationField(
  'upsertOneAutomationTrigger',
  {
    type: nonNull('AutomationTrigger'),
    args: {
      where: nonNull('AutomationTriggerWhereUniqueInput'),
      create: nonNull('AutomationTriggerCreateInput'),
      update: nonNull('AutomationTriggerUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationTrigger.upsert({
        ...args,
        ...select,
      })
    },
  },
)

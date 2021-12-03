import { mutationField, nonNull } from 'nexus'

export const AutomationTriggerUpdateOneMutation = mutationField(
  'updateOneAutomationTrigger',
  {
    type: nonNull('AutomationTrigger'),
    args: {
      data: nonNull('AutomationTriggerUpdateInput'),
      where: nonNull('AutomationTriggerWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.automationTrigger.update({
        where,
        data,
        ...select,
      })
    },
  },
)

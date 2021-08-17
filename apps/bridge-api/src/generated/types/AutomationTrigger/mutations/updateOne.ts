import { mutationField, nonNull } from 'nexus'

export const AutomationTriggerUpdateOneMutation = mutationField(
  'updateOneAutomationTrigger',
  {
    type: nonNull('AutomationTrigger'),
    args: {
      where: nonNull('AutomationTriggerWhereUniqueInput'),
      data: nonNull('AutomationTriggerUpdateInput'),
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

import { queryField, nonNull, list } from 'nexus'

export const AutomationActionFindCountQuery = queryField(
  'findManyAutomationActionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AutomationActionWhereInput',
      orderBy: list('AutomationActionOrderByWithRelationInput'),
      cursor: 'AutomationActionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AutomationActionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.automationAction.count(args as any)
    },
  },
)

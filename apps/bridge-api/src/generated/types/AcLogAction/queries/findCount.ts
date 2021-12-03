import { queryField, nonNull, list } from 'nexus'

export const AcLogActionFindCountQuery = queryField(
  'findManyAcLogActionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AcLogActionWhereInput',
      orderBy: list('AcLogActionOrderByWithRelationInput'),
      cursor: 'AcLogActionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AcLogActionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.acLogAction.count(args as any)
    },
  },
)

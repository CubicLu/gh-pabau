import { queryField, nonNull, list } from 'nexus'

export const CustomFieldDisplayFindManyQuery = queryField(
  'findManyCustomFieldDisplay',
  {
    type: nonNull(list(nonNull('CustomFieldDisplay'))),
    args: {
      where: 'CustomFieldDisplayWhereInput',
      orderBy: list('CustomFieldDisplayOrderByWithRelationInput'),
      cursor: 'CustomFieldDisplayWhereUniqueInput',
      distinct: 'CustomFieldDisplayScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.customFieldDisplay.findMany({
        ...args,
        ...select,
      })
    },
  },
)

import { queryField, nonNull, list } from 'nexus'

export const CustomFieldDisplayFindManyQuery = queryField(
  'findManyCustomFieldDisplay',
  {
    type: nonNull(list(nonNull('CustomFieldDisplay'))),
    args: {
      where: 'CustomFieldDisplayWhereInput',
      orderBy: list('CustomFieldDisplayOrderByWithRelationInput'),
      cursor: 'CustomFieldDisplayWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CustomFieldDisplayScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.customFieldDisplay.findMany({
        ...args,
        ...select,
      })
    },
  },
)

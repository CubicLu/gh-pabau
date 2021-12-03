import { queryField, list } from 'nexus'

export const CustomFieldDisplayFindFirstQuery = queryField(
  'findFirstCustomFieldDisplay',
  {
    type: 'CustomFieldDisplay',
    args: {
      where: 'CustomFieldDisplayWhereInput',
      orderBy: list('CustomFieldDisplayOrderByWithRelationInput'),
      cursor: 'CustomFieldDisplayWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CustomFieldDisplayScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.customFieldDisplay.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

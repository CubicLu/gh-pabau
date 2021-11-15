import { queryField, list } from 'nexus'

export const CustomFieldDisplayFindFirstQuery = queryField(
  'findFirstCustomFieldDisplay',
  {
    type: 'CustomFieldDisplay',
    args: {
      where: 'CustomFieldDisplayWhereInput',
      orderBy: list('CustomFieldDisplayOrderByWithRelationInput'),
      cursor: 'CustomFieldDisplayWhereUniqueInput',
      distinct: 'CustomFieldDisplayScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.customFieldDisplay.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

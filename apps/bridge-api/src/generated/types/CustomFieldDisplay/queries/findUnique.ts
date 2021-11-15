import { queryField, nonNull } from 'nexus'

export const CustomFieldDisplayFindUniqueQuery = queryField(
  'findUniqueCustomFieldDisplay',
  {
    type: 'CustomFieldDisplay',
    args: {
      where: nonNull('CustomFieldDisplayWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.customFieldDisplay.findUnique({
        where,
        ...select,
      })
    },
  },
)

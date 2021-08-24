import { queryField, nonNull } from 'nexus'

export const CmProductCustomFieldFindUniqueQuery = queryField(
  'findUniqueCmProductCustomField',
  {
    type: 'CmProductCustomField',
    args: {
      where: nonNull('CmProductCustomFieldWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.cmProductCustomField.findUnique({
        where,
        ...select,
      })
    },
  },
)

import { queryField, nonNull } from 'nexus'

export const CmAuthorizationFindUniqueQuery = queryField(
  'findUniqueCmAuthorization',
  {
    type: 'CmAuthorization',
    args: {
      where: nonNull('CmAuthorizationWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.cmAuthorization.findUnique({
        where,
        ...select,
      })
    },
  },
)

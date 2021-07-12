import { queryField, nonNull } from 'nexus'

export const ThirdPartyAccessFindUniqueQuery = queryField(
  'findUniqueThirdPartyAccess',
  {
    type: 'ThirdPartyAccess',
    args: {
      where: nonNull('ThirdPartyAccessWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.thirdPartyAccess.findUnique({
        where,
        ...select,
      })
    },
  },
)

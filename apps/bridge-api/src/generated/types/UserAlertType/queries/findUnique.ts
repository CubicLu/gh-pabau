import { queryField, nonNull } from 'nexus'

export const UserAlertTypeFindUniqueQuery = queryField(
  'findUniqueUserAlertType',
  {
    type: 'UserAlertType',
    args: {
      where: nonNull('UserAlertTypeWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.userAlertType.findUnique({
        where,
        ...select,
      })
    },
  },
)

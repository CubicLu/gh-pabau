import { queryField, list } from 'nexus'

export const UserAlertTypeFindFirstQuery = queryField(
  'findFirstUserAlertType',
  {
    type: 'UserAlertType',
    args: {
      where: 'UserAlertTypeWhereInput',
      orderBy: list('UserAlertTypeOrderByInput'),
      cursor: 'UserAlertTypeWhereUniqueInput',
      distinct: 'UserAlertTypeScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userAlertType.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

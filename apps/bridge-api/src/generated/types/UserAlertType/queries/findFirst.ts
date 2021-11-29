import { queryField, list } from 'nexus'

export const UserAlertTypeFindFirstQuery = queryField(
  'findFirstUserAlertType',
  {
    type: 'UserAlertType',
    args: {
      where: 'UserAlertTypeWhereInput',
      orderBy: list('UserAlertTypeOrderByWithRelationInput'),
      cursor: 'UserAlertTypeWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('UserAlertTypeScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userAlertType.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

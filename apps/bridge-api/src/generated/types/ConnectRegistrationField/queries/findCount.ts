import { queryField, nonNull, list } from 'nexus'

export const ConnectRegistrationFieldFindCountQuery = queryField(
  'findManyConnectRegistrationFieldCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ConnectRegistrationFieldWhereInput',
      orderBy: list('ConnectRegistrationFieldOrderByWithRelationInput'),
      cursor: 'ConnectRegistrationFieldWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ConnectRegistrationFieldScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.connectRegistrationField.count(args as any)
    },
  },
)

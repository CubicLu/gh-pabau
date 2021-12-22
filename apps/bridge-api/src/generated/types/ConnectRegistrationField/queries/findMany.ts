import { queryField, nonNull, list } from 'nexus'

export const ConnectRegistrationFieldFindManyQuery = queryField(
  'findManyConnectRegistrationField',
  {
    type: nonNull(list(nonNull('ConnectRegistrationField'))),
    args: {
      where: 'ConnectRegistrationFieldWhereInput',
      orderBy: list('ConnectRegistrationFieldOrderByWithRelationInput'),
      cursor: 'ConnectRegistrationFieldWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ConnectRegistrationFieldScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.connectRegistrationField.findMany({
        ...args,
        ...select,
      })
    },
  },
)

import { queryField, list } from 'nexus'

export const ConnectRegistrationFieldFindFirstQuery = queryField(
  'findFirstConnectRegistrationField',
  {
    type: 'ConnectRegistrationField',
    args: {
      where: 'ConnectRegistrationFieldWhereInput',
      orderBy: list('ConnectRegistrationFieldOrderByWithRelationInput'),
      cursor: 'ConnectRegistrationFieldWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ConnectRegistrationFieldScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.connectRegistrationField.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

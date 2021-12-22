import { queryField, list } from 'nexus'

export const ConnectRegistrationFieldAggregateQuery = queryField(
  'aggregateConnectRegistrationField',
  {
    type: 'AggregateConnectRegistrationField',
    args: {
      where: 'ConnectRegistrationFieldWhereInput',
      orderBy: list('ConnectRegistrationFieldOrderByWithRelationInput'),
      cursor: 'ConnectRegistrationFieldWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.connectRegistrationField.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)

import { queryField, nonNull } from 'nexus'

export const ConnectRegistrationFieldFindUniqueQuery = queryField(
  'findUniqueConnectRegistrationField',
  {
    type: 'ConnectRegistrationField',
    args: {
      where: nonNull('ConnectRegistrationFieldWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.connectRegistrationField.findUnique({
        where,
        ...select,
      })
    },
  },
)

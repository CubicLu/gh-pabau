import { mutationField, nonNull } from 'nexus'

export const ConnectRegistrationFieldDeleteOneMutation = mutationField(
  'deleteOneConnectRegistrationField',
  {
    type: 'ConnectRegistrationField',
    args: {
      where: nonNull('ConnectRegistrationFieldWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.connectRegistrationField.delete({
        where,
        ...select,
      })
    },
  },
)

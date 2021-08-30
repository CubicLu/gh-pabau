import { mutationField, nonNull } from 'nexus'

export const UserAlertTypeDeleteOneMutation = mutationField(
  'deleteOneUserAlertType',
  {
    type: 'UserAlertType',
    args: {
      where: nonNull('UserAlertTypeWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.userAlertType.delete({
        where,
        ...select,
      })
    },
  },
)

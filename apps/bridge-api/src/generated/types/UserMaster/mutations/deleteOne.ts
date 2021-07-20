import { mutationField, nonNull } from 'nexus'

export const UserMasterDeleteOneMutation = mutationField(
  'deleteOneUserMaster',
  {
    type: 'UserMaster',
    args: {
      where: nonNull('UserMasterWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.userMaster.delete({
        where,
        ...select,
      })
    },
  },
)

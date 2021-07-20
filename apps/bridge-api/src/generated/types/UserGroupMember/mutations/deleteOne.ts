import { mutationField, nonNull } from 'nexus'

export const UserGroupMemberDeleteOneMutation = mutationField(
  'deleteOneUserGroupMember',
  {
    type: 'UserGroupMember',
    args: {
      where: nonNull('UserGroupMemberWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.userGroupMember.delete({
        where,
        ...select,
      })
    },
  },
)

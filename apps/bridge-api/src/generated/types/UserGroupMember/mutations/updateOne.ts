import { mutationField, nonNull } from 'nexus'

export const UserGroupMemberUpdateOneMutation = mutationField(
  'updateOneUserGroupMember',
  {
    type: nonNull('UserGroupMember'),
    args: {
      data: nonNull('UserGroupMemberUpdateInput'),
      where: nonNull('UserGroupMemberWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.userGroupMember.update({
        where,
        data,
        ...select,
      })
    },
  },
)

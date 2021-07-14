import { mutationField, nonNull } from 'nexus'

export const UserGroupMemberUpdateOneMutation = mutationField(
  'updateOneUserGroupMember',
  {
    type: nonNull('UserGroupMember'),
    args: {
      where: nonNull('UserGroupMemberWhereUniqueInput'),
      data: nonNull('UserGroupMemberUpdateInput'),
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

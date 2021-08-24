import { mutationField, nonNull } from 'nexus'

export const UserGroupMemberCreateOneMutation = mutationField(
  'createOneUserGroupMember',
  {
    type: nonNull('UserGroupMember'),
    args: {
      data: nonNull('UserGroupMemberCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.userGroupMember.create({
        data,
        ...select,
      })
    },
  },
)

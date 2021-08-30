import { mutationField, nonNull } from 'nexus'

export const UserGroupMemberUpsertOneMutation = mutationField(
  'upsertOneUserGroupMember',
  {
    type: nonNull('UserGroupMember'),
    args: {
      where: nonNull('UserGroupMemberWhereUniqueInput'),
      create: nonNull('UserGroupMemberCreateInput'),
      update: nonNull('UserGroupMemberUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userGroupMember.upsert({
        ...args,
        ...select,
      })
    },
  },
)

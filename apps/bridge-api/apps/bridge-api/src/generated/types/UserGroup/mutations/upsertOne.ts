import { mutationField, nonNull } from 'nexus'

export const UserGroupUpsertOneMutation = mutationField('upsertOneUserGroup', {
  type: nonNull('UserGroup'),
  args: {
    where: nonNull('UserGroupWhereUniqueInput'),
    create: nonNull('UserGroupCreateInput'),
    update: nonNull('UserGroupUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.userGroup.upsert({
      ...args,
      ...select,
    })
  },
})

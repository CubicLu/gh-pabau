import { objectType, arg, extendType } from 'nexus'

export const UserGroupMember = objectType({
  name: 'UserGroupMember',
  definition(t) {
    t.model.id()
    t.model.user_id()
    t.model.group_id()
    t.model.User()
    t.model.UserGroup()
  },
})

export const userGroupMemberQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.userGroupMember()
    t.field('findFirstUserGroupMember', {
      type: 'UserGroupMember',
      args: {
        where: 'UserGroupMemberWhereInput',
        orderBy: arg({ type: 'UserGroupMemberOrderByInput' }),
        cursor: 'UserGroupMemberWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.userGroupMember.findFirst(args as any)
      },
    })
    t.crud.userGroupMembers({ filtering: true, ordering: true })
    t.field('userGroupMembersCount', {
      type: 'Int',
      args: {
        where: 'UserGroupMemberWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.userGroupMember.count(args as any)
      },
    })
  },
})

export const userGroupMemberMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneUserGroupMember()
    t.crud.updateOneUserGroupMember()
    t.crud.upsertOneUserGroupMember()
    t.crud.deleteOneUserGroupMember()
  },
})

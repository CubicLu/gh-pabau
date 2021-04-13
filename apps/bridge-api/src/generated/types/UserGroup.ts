import { objectType, arg, extendType } from 'nexus'

export const UserGroup = objectType({
  name: 'UserGroup',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.group_name()
    t.model.group_description()
    t.model.restrict_clients()
    t.model.restrict_locations()
    t.model.restrict_calendar()
    t.model.restrict_data()
    t.model.limit_contacts()
    t.model.permission_id()
    t.model.Company()
    t.model.Permission()
    t.model.UserGroupMember()
    t.model.GroupPermission()
  },
})

export const userGroupQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.userGroup()
    t.field('findFirstUserGroup', {
      type: 'UserGroup',
      args: {
        where: 'UserGroupWhereInput',
        orderBy: arg({ type: 'UserGroupOrderByInput' }),
        cursor: 'UserGroupWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.userGroup.findFirst(args as any)
      },
    })
    t.crud.userGroups({ filtering: true, ordering: true })
    t.field('userGroupsCount', {
      type: 'Int',
      args: {
        where: 'UserGroupWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.userGroup.count(args as any)
      },
    })
  },
})

export const userGroupMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneUserGroup()
    t.crud.updateOneUserGroup()
    t.crud.upsertOneUserGroup()
    t.crud.deleteOneUserGroup()
  },
})

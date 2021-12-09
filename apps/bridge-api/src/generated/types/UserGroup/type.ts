import { objectType } from 'nexus'

export const UserGroup = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'UserGroup',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('group_name')
    t.string('group_description')
    t.int('restrict_clients')
    t.string('restrict_locations')
    t.int('restrict_calendar')
    t.int('restrict_data')
    t.int('limit_contacts')
    t.nullable.int('permission_id')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.field('Permission', {
      type: 'PermissionTemplate',
      resolve(root: any) {
        return root.Permission
      },
    })
    t.list.field('UserGroupMember', {
      type: 'UserGroupMember',
      args: {
        where: 'UserGroupMemberWhereInput',
        orderBy: 'UserGroupMemberOrderByWithRelationInput',
        cursor: 'UserGroupMemberWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'UserGroupMemberScalarFieldEnum',
      },
      resolve(root: any) {
        return root.UserGroupMember
      },
    })
    t.list.field('GroupPermission', {
      type: 'GroupPermission',
      args: {
        where: 'GroupPermissionWhereInput',
        orderBy: 'GroupPermissionOrderByWithRelationInput',
        cursor: 'GroupPermissionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'GroupPermissionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.GroupPermission
      },
    })
    t.nullable.field('_count', {
      type: 'UserGroupCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})

import { objectType } from 'nexus'

export const PermissionTemplate = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'PermissionTemplate',
  definition(t) {
    t.int('id')
    t.string('name')
    t.int('company_id')
    t.string('app_permissions')
    t.string('user_permissions')
    t.string('mobile_permissions')
    t.string('mobile_widgets')
    t.string('disabled_services')
    t.string('alerts')
    t.boolean('is_admin')
    t.string('enabled_reports')
    t.boolean('all_reports')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.list.field('UserGroup', {
      type: 'UserGroup',
      args: {
        where: 'UserGroupWhereInput',
        orderBy: 'UserGroupOrderByWithRelationInput',
        cursor: 'UserGroupWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'UserGroupScalarFieldEnum',
      },
      resolve(root: any) {
        return root.UserGroup
      },
    })
    t.nullable.field('_count', {
      type: 'PermissionTemplateCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})

import { objectType } from 'nexus'

export const UserAlert = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'UserAlert',
  definition(t) {
    t.int('id')
    t.string('title')
    t.string('description')
    t.string('image')
    t.int('email_template_id')
    t.string('ios_message')
    t.string('sms_message')
    t.string('pabau_message')
    t.list.field('UserAlertPermission', {
      type: 'UserAlertPermission',
      args: {
        where: 'UserAlertPermissionWhereInput',
        orderBy: 'UserAlertPermissionOrderByWithRelationInput',
        cursor: 'UserAlertPermissionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'UserAlertPermissionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.UserAlertPermission
      },
    })
    t.nullable.field('_count', {
      type: 'UserAlertCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})

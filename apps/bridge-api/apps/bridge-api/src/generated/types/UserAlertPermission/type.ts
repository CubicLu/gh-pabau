import { objectType } from 'nexus'

export const UserAlertPermission = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'UserAlertPermission',
  definition(t) {
    t.int('id')
    t.int('uid')
    t.int('alert_id')
    t.int('company_id')
    t.int('ios_notification')
    t.int('email_notification')
    t.int('sms_notification')
    t.int('pabau_notification')
    t.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.field('UserAlert', {
      type: 'UserAlert',
      resolve(root: any) {
        return root.UserAlert
      },
    })
  },
})

import { objectType } from 'nexus'

export const GroupPermission = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'GroupPermission',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.int('group_id')
    t.string('module_permissions')
    t.string('feature_permissions')
    t.string('report_permissions')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})

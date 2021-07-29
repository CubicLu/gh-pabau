import { objectType } from 'nexus'

export const TblModuleFieldsSetting = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'TblModuleFieldsSetting',
  definition(t) {
    t.int('id')
    t.nullable.int('module_id')
    t.nullable.string('field_name')
    t.nullable.string('field_label')
    t.nullable.boolean('is_active')
    t.int('is_required')
    t.nullable.int('company_id')
    t.nullable.int('uid')
    t.int('order')
    t.nullable.field('created_date', { type: 'DateTime' })
    t.nullable.field('last_updated_date', { type: 'DateTime' })
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})

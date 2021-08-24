import { objectType } from 'nexus'

export const ClassTemplateSetting = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ClassTemplateSetting',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.nullable.int('class_wait_list_template_enable')
    t.nullable.int('class_wait_list_template_id')
    t.int('class_wait_list_sms_template_enable')
    t.int('class_wait_list_sms_template_id')
    t.nullable.int('uid')
    t.nullable.field('creation_date', { type: 'DateTime' })
    t.nullable.field('modified_date', { type: 'DateTime' })
  },
})

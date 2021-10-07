import { objectType } from 'nexus'

export const ClientFormSetting = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ClientFormSetting',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.int('enable_medical')
    t.int('form_id')
    t.int('not_seen_months')
    t.int('enable_new_and_old')
    t.int('checked_by_default')
    t.int('new_client_template')
    t.int('not_seen_template')
  },
})

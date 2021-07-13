import { objectType } from 'nexus'

export const MedicalForm = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'MedicalForm',
  definition(t) {
    t.int('id')
    t.int('user_deleted')
    t.nullable.string('name')
    t.nullable.string('data')
    t.nullable.field('created_at', { type: 'DateTime' })
    t.nullable.field('updated_at', { type: 'DateTime' })
    t.nullable.field('deleted_at', { type: 'DateTime' })
    t.nullable.int('nhs_locum_id')
    t.nullable.int('nhs_procedure_id')
    t.int('locked')
    t.string('printout')
    t.int('company_id')
    t.int('user_created')
    t.int('encoded')
    t.string('form_type')
    t.string('service_id')
    t.nullable.int('ipad_only')
    t.nullable.int('heading_setting')
    t.int('temp_static')
    t.string('old_data')
    t.string('form_category')
    t.string('author')
    t.string('diagnosis_code')
    t.int('is_fav')
    t.int('diagnosis_code_enabled')
    t.int('lab_id')
    t.boolean('is_private')
  },
})

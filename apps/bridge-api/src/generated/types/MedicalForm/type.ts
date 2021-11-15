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
    t.nullable.int('company_id')
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
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.field('CreatedBy', {
      type: 'User',
      resolve(root: any) {
        return root.CreatedBy
      },
    })
    t.list.field('MedicalFormAdvancedSetting', {
      type: 'MedicalFormAdvancedSetting',
      args: {
        where: 'MedicalFormAdvancedSettingWhereInput',
        orderBy: 'MedicalFormAdvancedSettingOrderByWithRelationInput',
        cursor: 'MedicalFormAdvancedSettingWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'MedicalFormAdvancedSettingScalarFieldEnum',
      },
      resolve(root: any) {
        return root.MedicalFormAdvancedSetting
      },
    })
    t.list.field('MedicalFormContact', {
      type: 'MedicalFormContact',
      args: {
        where: 'MedicalFormContactWhereInput',
        orderBy: 'MedicalFormContactOrderByWithRelationInput',
        cursor: 'MedicalFormContactWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'MedicalFormContactScalarFieldEnum',
      },
      resolve(root: any) {
        return root.MedicalFormContact
      },
    })
    t.list.field('PathwayStep', {
      type: 'PathwayStep',
      args: {
        where: 'PathwayStepWhereInput',
        orderBy: 'PathwayStepOrderByWithRelationInput',
        cursor: 'PathwayStepWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PathwayStepScalarFieldEnum',
      },
      resolve(root: any) {
        return root.PathwayStep
      },
    })
    t.nullable.field('_count', {
      type: 'MedicalFormCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})

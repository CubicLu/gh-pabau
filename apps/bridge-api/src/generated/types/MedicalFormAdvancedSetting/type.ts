import { objectType } from 'nexus'

export const MedicalFormAdvancedSetting = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'MedicalFormAdvancedSetting',
  definition(t) {
    t.int('id')
    t.int('medical_form')
    t.nullable.int('company_id')
    t.boolean('share_to_client')
    t.int('reminder')
    t.json('data')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.list.field('MedicalForm', {
      type: 'MedicalForm',
      args: {
        where: 'MedicalFormWhereInput',
        orderBy: 'MedicalFormOrderByInput',
        cursor: 'MedicalFormWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'MedicalFormScalarFieldEnum',
      },
      resolve(root: any) {
        return root.MedicalForm
      },
    })
    t.nullable.field('_count', {
      type: 'MedicalFormAdvancedSettingCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})

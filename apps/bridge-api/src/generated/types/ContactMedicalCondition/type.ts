import { objectType } from 'nexus'

export const ContactMedicalCondition = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ContactMedicalCondition',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.int('contact_id')
    t.int('medical_condition_id')
    t.int('medical_record_id')
    t.boolean('is_active')
    t.field('CmContact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.CmContact
      },
    })
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.field('MedicalCondition', {
      type: 'MedicalCondition',
      resolve(root: any) {
        return root.MedicalCondition
      },
    })
  },
})

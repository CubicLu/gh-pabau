import { objectType } from 'nexus'

export const CmExtraSalon = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmExtraSalon',
  definition(t) {
    t.int('id')
    t.int('contact_id')
    t.string('primary_service')
    t.string('hair_length')
    t.string('hair_texture')
    t.int('company_id')
    t.string('skin_type')
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
  },
})

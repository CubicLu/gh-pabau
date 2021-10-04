import { objectType } from 'nexus'

export const ContactAlert = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ContactAlert',
  definition(t) {
    t.int('ID')
    t.int('OwnerID')
    t.int('ContactID')
    t.string('Note')
    t.field('Status', { type: 'cm_contact_alerts_Status' })
    t.field('CreatedDate', { type: 'DateTime' })
    t.int('IpAddress')
    t.int('Critical')
    t.int('medical_conditions_id')
    t.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
    t.field('CmContact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.CmContact
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

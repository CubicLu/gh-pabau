import { objectType } from 'nexus'

export const CommunicationAttachment = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CommunicationAttachment',
  definition(t) {
    t.int('id')
    t.int('communication_id')
    t.int('company_id')
    t.int('contact_id')
    t.string('file_url')
    t.field('Communication', {
      type: 'Communication',
      resolve(root: any) {
        return root.Communication
      },
    })
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

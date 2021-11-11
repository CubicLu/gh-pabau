import { objectType } from 'nexus'

export const ContactNote = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ContactNote',
  definition(t) {
    t.int('ID')
    t.int('OwnerID')
    t.int('ContactID')
    t.string('Note')
    t.field('Status', { type: 'cm_contact_notes_Status' })
    t.field('CreatedDate', { type: 'DateTime' })
    t.nullable.string('IpAddress')
    t.boolean('imported')
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
  },
})

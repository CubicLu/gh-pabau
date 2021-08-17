import { objectType } from 'nexus'

export const CmAccountNote = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmAccountNote',
  definition(t) {
    t.int('ID')
    t.int('OwnerID')
    t.int('AccountID')
    t.string('Note')
    t.field('Status', { type: 'cm_account_notes_Status' })
    t.field('CreatedDate', { type: 'DateTime' })
    t.int('IpAddress')
  },
})

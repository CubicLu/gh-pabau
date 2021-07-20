import { objectType } from 'nexus'

export const CmCaseNote = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmCaseNote',
  definition(t) {
    t.int('ID')
    t.int('OwnerID')
    t.int('CaseID')
    t.string('Note')
    t.field('Status', { type: 'cm_case_notes_Status' })
    t.field('CreatedDate', { type: 'DateTime' })
    t.int('IpAddress')
  },
})

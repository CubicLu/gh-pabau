import { objectType } from 'nexus'

export const CmLeadNote = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmLeadNote',
  definition(t) {
    t.int('ID')
    t.int('OwnerID')
    t.int('LeadID')
    t.string('Note')
    t.field('Status', { type: 'cm_lead_notes_Status' })
    t.nullable.field('CreatedDate', { type: 'DateTime' })
    t.nullable.float('IpAddress')
    t.field('CmLead', {
      type: 'CmLead',
      resolve(root: any) {
        return root.CmLead
      },
    })
  },
})

import { objectType } from 'nexus'

export const CmCampaignNote = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmCampaignNote',
  definition(t) {
    t.int('ID')
    t.int('OwnerID')
    t.int('BookingID')
    t.string('Note')
    t.field('Status', { type: 'cm_compaign_notes_Status' })
    t.field('CreatedDate', { type: 'DateTime' })
    t.int('IpAddress')
  },
})

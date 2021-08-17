import { objectType } from 'nexus'

export const CampaignAttachment = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CampaignAttachment',
  definition(t) {
    t.int('id')
    t.int('campaign_id')
    t.int('company_id')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.string('attach_time')
    t.string('attach_user_name')
    t.string('attachment_type')
    t.int('attach_id')
  },
})

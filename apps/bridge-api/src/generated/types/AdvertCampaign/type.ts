import { objectType } from 'nexus'

export const AdvertCampaign = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'AdvertCampaign',
  definition(t) {
    t.int('id')
    t.string('advert_name')
    t.string('advert_type')
    t.string('campaign_budget')
    t.string('campaign_interval')
    t.string('campaign_audience')
    t.int('campaign_id')
    t.int('cid')
    t.int('attach_id')
    t.string('engagement')
    t.int('advert_reach')
    t.int('Clicks')
    t.string('start')
    t.string('end')
    t.string('url')
    t.string('attached_by')
    t.string('attach_time')
  },
})

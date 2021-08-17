import { objectType } from 'nexus'

export const CheckinQueue = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CheckinQueue',
  definition(t) {
    t.int('id')
    t.int('uid')
    t.boolean('been_before')
    t.field('date_start', { type: 'DateTime' })
    t.boolean('accepted')
    t.boolean('is_lunch')
    t.string('name')
    t.nullable.field('date_accepted', { type: 'DateTime' })
    t.nullable.field('date_end', { type: 'DateTime' })
    t.boolean('was_anyone')
    t.nullable.boolean('finalise')
    t.nullable.string('sms_number')
    t.nullable.field('sms_sent', { type: 'DateTime' })
    t.nullable.boolean('sms_wanted')
    t.int('skips')
    t.nullable.int('connect_id')
    t.int('order')
    t.nullable.string('spotify_uri')
    t.nullable.field('date_binned', { type: 'DateTime' })
  },
})

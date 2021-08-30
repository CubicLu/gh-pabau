import { mutationField, nonNull, inputObjectType, objectType } from 'nexus'
import { Context } from '../../../context'
import { register } from '../pabau-api'

export const WebinarEnrollInput = inputObjectType({
  name: 'WebinarEnrollInput',
  definition(t) {
    t.nonNull.int('webinar_id')
    t.nonNull.int('course_id')
    t.nonNull.string('course_date')
  },
})

export const WebinarRegisteredUser = objectType({
  name: 'WebinarRegisteredUser',
  definition(t) {
    t.int('webinar_id')
    t.string('webinar_hash')
    t.string('first_name')
    t.string('last_name')
    t.int('phone_country_code')
    t.string('email')
    t.string('timezone')
    t.int('phone')
    t.string('live_room_url')
    t.string('replay_room_url')
    t.string('thank_you_url')
    t.string('date')
    t.string('password')
    t.int('schedule')
    t.int('user_id')
  },
})

export const WebinarEnrollResult = objectType({
  name: 'WebinarEnrollResult',
  definition(t) {
    t.string('status')
    t.field('user', {
      type: 'WebinarRegisteredUser',
      resolve(root: any) {
        return root.user
      },
    })
  },
})

export const WebinarEnroll = mutationField('enroll', {
  type: 'WebinarEnrollResult',
  args: {
    webinar: nonNull('WebinarEnrollInput'),
  },
  async resolve(_root, { webinar }, ctx: Context) {
    return await register(ctx, webinar)
  },
})

import { extendType, intArg, nonNull, objectType, list } from 'nexus'
import { findUnique, findAll } from '../webinar-jam'

export const WebinarSchedule = objectType({
  name: 'WebinarSchedule',
  definition(t) {
    t.field('date', { type: 'DateTime' })
    t.int('schedule')
    t.string('comment')
  },
})

export const FetchManyWebinarResult = objectType({
  name: 'FetchManyWebinarResult',
  definition(t) {
    t.int('webinar_id')
    t.string('webinar_hash')
    t.string('name')
    t.string('description')
    t.string('type')
    t.string('timezone')
    t.field('schedules', {
      type: list('String'),
      resolve(root: any, _) {
        return root.schedules
      },
    })
  },
})

export const WebinarResult = objectType({
  name: 'WebinarResult',
  definition(t) {
    t.int('webinar_id')
    t.string('webinar_hash')
    t.string('name')
    t.string('description')
    t.string('type')
    t.string('timezone')
    t.list.field('schedules', {
      type: 'WebinarSchedule',
      resolve(root: any, _) {
        return root.schedules
      },
    })
    t.string('registration_url')
    t.string('registration_type')
    t.decimal('registration_fee')
    t.string('registration_currency')
    t.string('registration_checkout_url')
    t.string('registration_post_payment_url')
    t.string('direct_live_room_url')
    t.string('direct_replay_room_url')
  },
})

export const FindUniqueWebinar = extendType({
  type: 'Query',
  definition(t) {
    t.field('webinar', {
      type: 'WebinarResult',
      description: 'Fetches one webinar-jam',
      args: {
        id: nonNull(intArg()),
      },
      async resolve(_root, { id }) {
        return await findUnique(id)
      },
    })
    t.list.field('webinars', {
      type: 'FetchManyWebinarResult',
      description:
        'Fetches a list containing all webinars created on webinarjam',
      async resolve(_root, _) {
        return await findAll()
      },
    })
  },
})

import { extendType, objectType, stringArg } from 'nexus'
import { Context } from '../../../context'
import { webinars, filterWebinars } from '../pabau-api'

export const PabauWebinarList = objectType({
  name: 'PabauWebinarList',
  definition(t) {
    t.int('id')
    t.string('course_date')
    t.string('display_date')
    t.int('course_id')
    t.int('webinar_id')
    t.string('trainer')
    t.int('subject_id')
    t.string('course_tag')
    t.string('course_name')
    t.string('description')
    t.int('custom_field_id')
    t.int('encore')
    t.int('duration')
    t.int('premium')
    t.string('category')
    t.string('difficulty')
    t.int('registered_id')
  },
})

export const DefaultWebinarPerPage = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('upcomingWebinars', {
      type: 'PabauWebinarList',
      description: 'Fetches a list of upcoming webinars from crm',
      async resolve(_root, _args, ctx: Context) {
        return await webinars(ctx)
      },
    })
  },
})
export const FilteredWebinarsPerPage = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('filterWebinars', {
      type: 'PabauWebinarList',
      args: {
        trainer: stringArg(),
        difficulty: stringArg(),
        category: stringArg(),
      },
      description: 'Fetches a list of filtered upcoming webinars from crm',
      async resolve(_root, { trainer, difficulty, category }, ctx: Context) {
        return await filterWebinars(ctx, trainer, category, difficulty)
      },
    })
  },
})

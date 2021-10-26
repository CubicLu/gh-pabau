import { objectType } from 'nexus'

export const PathwayStepsTaken = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'PathwayStepsTaken',
  definition(t) {
    t.int('id')
    t.int('step_id')
    t.int('path_taken_id')
    t.int('contact_id')
    t.field('date', { type: 'DateTime' })
    t.nullable.string('time')
    t.field('status', { type: 'cp_steps_taken_status' })
    t.int('record_id')
    t.field('PathwaysTaken', {
      type: 'PathwaysTaken',
      resolve(root: any) {
        return root.PathwaysTaken
      },
    })
    t.field('PathwayStep', {
      type: 'PathwayStep',
      resolve(root: any) {
        return root.PathwayStep
      },
    })
    t.field('CmContact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.CmContact
      },
    })
  },
})

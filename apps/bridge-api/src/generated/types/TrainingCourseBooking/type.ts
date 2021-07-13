import { objectType } from 'nexus'

export const TrainingCourseBooking = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'TrainingCourseBooking',
  definition(t) {
    t.int('id')
    t.int('course_id')
    t.int('webinar_id')
    t.field('course_date', { type: 'DateTime' })
    t.string('trainer')
    t.nullable.int('encore')
    t.field('TrainingCourse', {
      type: 'TrainingCourse',
      resolve(root: any) {
        return root.TrainingCourse
      },
    })
  },
})

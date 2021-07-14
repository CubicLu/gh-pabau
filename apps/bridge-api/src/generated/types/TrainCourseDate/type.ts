import { objectType } from 'nexus'

export const TrainCourseDate = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'TrainCourseDate',
  definition(t) {
    t.int('id')
    t.int('course_id')
    t.int('user_id')
    t.int('company_id')
    t.field('status', { type: 'train_course_dates_status' })
    t.field('course_date', { type: 'DateTime' })
    t.field('TrainingCourse', {
      type: 'TrainingCourse',
      resolve(root: any) {
        return root.TrainingCourse
      },
    })
    t.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})

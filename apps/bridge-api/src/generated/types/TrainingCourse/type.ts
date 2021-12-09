import { objectType } from 'nexus'

export const TrainingCourse = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'TrainingCourse',
  description: `/ The underlying table does not contain a valid unique identifier and can therefore currently not be handled by the Prisma Client.
/ model training_guides_completion {
/ }`,
  definition(t) {
    t.int('id')
    t.string('course_name')
    t.string('course_tag')
    t.int('custom_field_id')
    t.int('duration')
    t.string('description')
    t.int('premium')
    t.int('encore')
    t.nullable.string('category')
    t.field('difficulty', { type: 'train_course_difficulty' })
    t.list.field('TrainingCourseBooking', {
      type: 'TrainingCourseBooking',
      args: {
        where: 'TrainingCourseBookingWhereInput',
        orderBy: 'TrainingCourseBookingOrderByWithRelationInput',
        cursor: 'TrainingCourseBookingWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'TrainingCourseBookingScalarFieldEnum',
      },
      resolve(root: any) {
        return root.TrainingCourseBooking
      },
    })
    t.list.field('TrainCourseDate', {
      type: 'TrainCourseDate',
      args: {
        where: 'TrainCourseDateWhereInput',
        orderBy: 'TrainCourseDateOrderByWithRelationInput',
        cursor: 'TrainCourseDateWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'TrainCourseDateScalarFieldEnum',
      },
      resolve(root: any) {
        return root.TrainCourseDate
      },
    })
    t.field('_count', {
      type: 'TrainingCourseCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})

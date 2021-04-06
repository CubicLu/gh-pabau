import { objectType, arg, extendType } from 'nexus'

export const TrainingCourse = objectType({
  name: 'TrainingCourse',
  definition(t) {
    t.model.id()
    t.model.course_name()
    t.model.course_tag()
    t.model.custom_field_id()
    t.model.duration()
    t.model.description()
    t.model.premium()
    t.model.encore()
    t.model.category()
    t.model.difficulty()
    t.model.TrainingCourseBooking()
    t.model.TrainCourseDate()
  },
})

export const trainingCourseQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.trainingCourse()
    t.field('findFirstTrainingCourse', {
      type: 'TrainingCourse',
      args: {
        where: 'TrainingCourseWhereInput',
        orderBy: arg({ type: 'TrainingCourseOrderByInput' }),
        cursor: 'TrainingCourseWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.trainingCourse.findFirst(args as any)
      },
    })
    t.crud.trainingCourses({ filtering: true, ordering: true })
    t.field('trainingCoursesCount', {
      type: 'Int',
      args: {
        where: 'TrainingCourseWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.trainingCourse.count(args as any)
      },
    })
  },
})

export const trainingCourseMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneTrainingCourse()
    t.crud.updateOneTrainingCourse()
    t.crud.upsertOneTrainingCourse()
    t.crud.deleteOneTrainingCourse()
    t.crud.updateManyTrainingCourse()
  },
})

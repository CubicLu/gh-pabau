import { objectType, arg, extendType } from 'nexus'

export const TrainCourseDate = objectType({
  name: 'TrainCourseDate',
  definition(t) {
    t.model.id()
    t.model.course_id()
    t.model.user_id()
    t.model.company_id()
    t.model.status()
    t.model.course_date()
    t.model.TrainingCourse()
    t.model.User()
    t.model.Company()
  },
})

export const trainCourseDateQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.trainCourseDate()
    t.field('findFirstTrainCourseDate', {
      type: 'TrainCourseDate',
      args: {
        where: 'TrainCourseDateWhereInput',
        orderBy: arg({ type: 'TrainCourseDateOrderByInput' }),
        cursor: 'TrainCourseDateWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.trainCourseDate.findFirst(args as any)
      },
    })
    t.crud.trainCourseDates({ filtering: true, ordering: true })
    t.field('trainCourseDatesCount', {
      type: 'Int',
      args: {
        where: 'TrainCourseDateWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.trainCourseDate.count(args as any)
      },
    })
  },
})

export const trainCourseDateMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneTrainCourseDate()
    t.crud.updateOneTrainCourseDate()
    t.crud.upsertOneTrainCourseDate()
    t.crud.deleteOneTrainCourseDate()
    t.crud.updateManyTrainCourseDate()
  },
})

import { queryField, list } from 'nexus'

export const TrainingCourseAggregateQuery = queryField(
  'aggregateTrainingCourse',
  {
    type: 'AggregateTrainingCourse',
    args: {
      where: 'TrainingCourseWhereInput',
      orderBy: list('TrainingCourseOrderByInput'),
      cursor: 'TrainingCourseWhereUniqueInput',
      distinct: 'TrainingCourseScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.trainingCourse.aggregate({ ...args, ...select }) as any
    },
  },
)

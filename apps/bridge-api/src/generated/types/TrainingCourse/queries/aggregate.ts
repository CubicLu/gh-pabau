import { queryField, list } from 'nexus'

export const TrainingCourseAggregateQuery = queryField(
  'aggregateTrainingCourse',
  {
    type: 'AggregateTrainingCourse',
    args: {
      where: 'TrainingCourseWhereInput',
      orderBy: list('TrainingCourseOrderByWithRelationInput'),
      cursor: 'TrainingCourseWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.trainingCourse.aggregate({ ...args, ...select }) as any
    },
  },
)

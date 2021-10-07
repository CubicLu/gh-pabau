import { queryField, nonNull, list } from 'nexus'

export const TrainingCourseFindCountQuery = queryField(
  'findManyTrainingCourseCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'TrainingCourseWhereInput',
      orderBy: list('TrainingCourseOrderByWithRelationInput'),
      cursor: 'TrainingCourseWhereUniqueInput',
      distinct: 'TrainingCourseScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.trainingCourse.count(args as any)
    },
  },
)

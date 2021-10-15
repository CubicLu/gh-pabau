import { queryField, list } from 'nexus'

export const TrainingCourseFindFirstQuery = queryField(
  'findFirstTrainingCourse',
  {
    type: 'TrainingCourse',
    args: {
      where: 'TrainingCourseWhereInput',
      orderBy: list('TrainingCourseOrderByInput'),
      cursor: 'TrainingCourseWhereUniqueInput',
      distinct: 'TrainingCourseScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.trainingCourse.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

import { queryField, list } from 'nexus'

export const TrainingCourseFindFirstQuery = queryField(
  'findFirstTrainingCourse',
  {
    type: 'TrainingCourse',
    args: {
      where: 'TrainingCourseWhereInput',
      orderBy: list('TrainingCourseOrderByWithRelationInput'),
      cursor: 'TrainingCourseWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('TrainingCourseScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.trainingCourse.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

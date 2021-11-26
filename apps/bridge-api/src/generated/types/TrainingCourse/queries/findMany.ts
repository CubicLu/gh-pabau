import { queryField, nonNull, list } from 'nexus'

export const TrainingCourseFindManyQuery = queryField(
  'findManyTrainingCourse',
  {
    type: nonNull(list(nonNull('TrainingCourse'))),
    args: {
      where: 'TrainingCourseWhereInput',
      orderBy: list('TrainingCourseOrderByWithRelationInput'),
      cursor: 'TrainingCourseWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('TrainingCourseScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.trainingCourse.findMany({
        ...args,
        ...select,
      })
    },
  },
)

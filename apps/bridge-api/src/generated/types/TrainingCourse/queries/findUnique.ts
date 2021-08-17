import { queryField, nonNull } from 'nexus'

export const TrainingCourseFindUniqueQuery = queryField(
  'findUniqueTrainingCourse',
  {
    type: 'TrainingCourse',
    args: {
      where: nonNull('TrainingCourseWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.trainingCourse.findUnique({
        where,
        ...select,
      })
    },
  },
)

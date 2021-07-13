import { mutationField, nonNull } from 'nexus'

export const TrainingCourseCreateOneMutation = mutationField(
  'createOneTrainingCourse',
  {
    type: nonNull('TrainingCourse'),
    args: {
      data: nonNull('TrainingCourseCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.trainingCourse.create({
        data,
        ...select,
      })
    },
  },
)

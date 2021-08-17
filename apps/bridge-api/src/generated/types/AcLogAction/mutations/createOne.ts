import { mutationField, nonNull } from 'nexus'

export const AcLogActionCreateOneMutation = mutationField(
  'createOneAcLogAction',
  {
    type: nonNull('AcLogAction'),
    args: {
      data: nonNull('AcLogActionCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.acLogAction.create({
        data,
        ...select,
      })
    },
  },
)

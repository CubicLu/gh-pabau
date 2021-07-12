import { mutationField, nonNull } from 'nexus'

export const CalRangeRequestCreateOneMutation = mutationField(
  'createOneCalRangeRequest',
  {
    type: nonNull('CalRangeRequest'),
    args: {
      data: nonNull('CalRangeRequestCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.calRangeRequest.create({
        data,
        ...select,
      })
    },
  },
)

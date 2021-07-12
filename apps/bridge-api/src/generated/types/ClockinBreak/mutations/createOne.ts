import { mutationField, nonNull } from 'nexus'

export const ClockinBreakCreateOneMutation = mutationField(
  'createOneClockinBreak',
  {
    type: nonNull('ClockinBreak'),
    args: {
      data: nonNull('ClockinBreakCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.clockinBreak.create({
        data,
        ...select,
      })
    },
  },
)

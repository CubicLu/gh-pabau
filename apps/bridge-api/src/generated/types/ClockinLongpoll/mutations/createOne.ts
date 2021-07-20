import { mutationField, nonNull } from 'nexus'

export const ClockinLongpollCreateOneMutation = mutationField(
  'createOneClockinLongpoll',
  {
    type: nonNull('ClockinLongpoll'),
    args: {
      data: nonNull('ClockinLongpollCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.clockinLongpoll.create({
        data,
        ...select,
      })
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const AppBeforeAfterCreateOneMutation = mutationField(
  'createOneAppBeforeAfter',
  {
    type: nonNull('AppBeforeAfter'),
    args: {
      data: nonNull('AppBeforeAfterCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.appBeforeAfter.create({
        data,
        ...select,
      })
    },
  },
)

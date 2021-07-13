import { mutationField, nonNull } from 'nexus'

export const CmContactViewedCreateOneMutation = mutationField(
  'createOneCmContactViewed',
  {
    type: nonNull('CmContactViewed'),
    args: {
      data: nonNull('CmContactViewedCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cmContactViewed.create({
        data,
        ...select,
      })
    },
  },
)

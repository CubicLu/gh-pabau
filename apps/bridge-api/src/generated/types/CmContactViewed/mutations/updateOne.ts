import { mutationField, nonNull } from 'nexus'

export const CmContactViewedUpdateOneMutation = mutationField(
  'updateOneCmContactViewed',
  {
    type: nonNull('CmContactViewed'),
    args: {
      data: nonNull('CmContactViewedUpdateInput'),
      where: nonNull('CmContactViewedWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmContactViewed.update({
        where,
        data,
        ...select,
      })
    },
  },
)

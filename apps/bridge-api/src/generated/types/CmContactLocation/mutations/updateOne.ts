import { mutationField, nonNull } from 'nexus'

export const CmContactLocationUpdateOneMutation = mutationField(
  'updateOneCmContactLocation',
  {
    type: nonNull('CmContactLocation'),
    args: {
      where: nonNull('CmContactLocationWhereUniqueInput'),
      data: nonNull('CmContactLocationUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmContactLocation.update({
        where,
        data,
        ...select,
      })
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const CmContactJsonUpdateOneMutation = mutationField(
  'updateOneCmContactJson',
  {
    type: nonNull('CmContactJson'),
    args: {
      where: nonNull('CmContactJsonWhereUniqueInput'),
      data: nonNull('CmContactJsonUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmContactJson.update({
        where,
        data,
        ...select,
      })
    },
  },
)

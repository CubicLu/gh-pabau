import { mutationField, nonNull } from 'nexus'

export const CmContactCustomUpdateOneMutation = mutationField(
  'updateOneCmContactCustom',
  {
    type: nonNull('CmContactCustom'),
    args: {
      where: nonNull('CmContactCustomWhereUniqueInput'),
      data: nonNull('CmContactCustomUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmContactCustom.update({
        where,
        data,
        ...select,
      })
    },
  },
)

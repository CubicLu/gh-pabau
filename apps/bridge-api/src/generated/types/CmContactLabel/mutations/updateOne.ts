import { mutationField, nonNull } from 'nexus'

export const CmContactLabelUpdateOneMutation = mutationField(
  'updateOneCmContactLabel',
  {
    type: nonNull('CmContactLabel'),
    args: {
      data: nonNull('CmContactLabelUpdateInput'),
      where: nonNull('CmContactLabelWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmContactLabel.update({
        where,
        data,
        ...select,
      })
    },
  },
)

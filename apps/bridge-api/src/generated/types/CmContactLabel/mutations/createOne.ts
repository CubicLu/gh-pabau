import { mutationField, nonNull } from 'nexus'

export const CmContactLabelCreateOneMutation = mutationField(
  'createOneCmContactLabel',
  {
    type: nonNull('CmContactLabel'),
    args: {
      data: nonNull('CmContactLabelCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cmContactLabel.create({
        data,
        ...select,
      })
    },
  },
)

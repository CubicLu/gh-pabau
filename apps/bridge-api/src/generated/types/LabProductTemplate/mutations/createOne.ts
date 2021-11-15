import { mutationField, nonNull } from 'nexus'

export const LabProductTemplateCreateOneMutation = mutationField(
  'createOneLabProductTemplate',
  {
    type: nonNull('LabProductTemplate'),
    args: {
      data: nonNull('LabProductTemplateCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.labProductTemplate.create({
        data,
        ...select,
      })
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const CmLeadCustomFieldOrderCreateOneMutation = mutationField(
  'createOneCmLeadCustomFieldOrder',
  {
    type: nonNull('CmLeadCustomFieldOrder'),
    args: {
      data: nonNull('CmLeadCustomFieldOrderCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cmLeadCustomFieldOrder.create({
        data,
        ...select,
      })
    },
  },
)

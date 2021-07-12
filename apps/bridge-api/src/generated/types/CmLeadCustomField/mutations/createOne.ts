import { mutationField, nonNull } from 'nexus'

export const CmLeadCustomFieldCreateOneMutation = mutationField(
  'createOneCmLeadCustomField',
  {
    type: nonNull('CmLeadCustomField'),
    args: {
      data: nonNull('CmLeadCustomFieldCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cmLeadCustomField.create({
        data,
        ...select,
      })
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const CmLeadCustomFieldUpsertOneMutation = mutationField(
  'upsertOneCmLeadCustomField',
  {
    type: nonNull('CmLeadCustomField'),
    args: {
      where: nonNull('CmLeadCustomFieldWhereUniqueInput'),
      create: nonNull('CmLeadCustomFieldCreateInput'),
      update: nonNull('CmLeadCustomFieldUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmLeadCustomField.upsert({
        ...args,
        ...select,
      })
    },
  },
)

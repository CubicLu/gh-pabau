import { mutationField, nonNull } from 'nexus'

export const CmLeadCustomFieldOrderUpsertOneMutation = mutationField(
  'upsertOneCmLeadCustomFieldOrder',
  {
    type: nonNull('CmLeadCustomFieldOrder'),
    args: {
      where: nonNull('CmLeadCustomFieldOrderWhereUniqueInput'),
      create: nonNull('CmLeadCustomFieldOrderCreateInput'),
      update: nonNull('CmLeadCustomFieldOrderUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmLeadCustomFieldOrder.upsert({
        ...args,
        ...select,
      })
    },
  },
)

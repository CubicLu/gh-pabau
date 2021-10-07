import { mutationField, nonNull } from 'nexus'

export const CmLeadUpsertOneMutation = mutationField('upsertOneCmLead', {
  type: nonNull('CmLead'),
  args: {
    where: nonNull('CmLeadWhereUniqueInput'),
    create: nonNull('CmLeadCreateInput'),
    update: nonNull('CmLeadUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmLead.upsert({
      ...args,
      ...select,
    })
  },
})

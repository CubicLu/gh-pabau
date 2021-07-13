import { mutationField, nonNull } from 'nexus'

export const CmContactUpsertOneMutation = mutationField('upsertOneCmContact', {
  type: nonNull('CmContact'),
  args: {
    where: nonNull('CmContactWhereUniqueInput'),
    create: nonNull('CmContactCreateInput'),
    update: nonNull('CmContactUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmContact.upsert({
      ...args,
      ...select,
    })
  },
})

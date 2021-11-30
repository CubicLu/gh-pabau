import { mutationField, nonNull } from 'nexus'

export const CmLeadUpdateManyMutation = mutationField('updateManyCmLead', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('CmLeadUpdateManyMutationInput'),
    where: 'CmLeadWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cmLead.updateMany(args as any)
  },
})

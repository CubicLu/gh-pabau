import { mutationField, nonNull } from 'nexus'

export const CmLeadUpdateManyMutation = mutationField('updateManyCmLead', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'CmLeadWhereInput',
    data: nonNull('CmLeadUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cmLead.updateMany(args as any)
  },
})

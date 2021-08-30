import { queryField, nonNull } from 'nexus'

export const CmLeadFindUniqueQuery = queryField('findUniqueCmLead', {
  type: 'CmLead',
  args: {
    where: nonNull('CmLeadWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.cmLead.findUnique({
      where,
      ...select,
    })
  },
})

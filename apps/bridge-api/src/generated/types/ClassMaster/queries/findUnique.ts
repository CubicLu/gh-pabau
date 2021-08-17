import { queryField, nonNull } from 'nexus'

export const ClassMasterFindUniqueQuery = queryField('findUniqueClassMaster', {
  type: 'ClassMaster',
  args: {
    where: nonNull('ClassMasterWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.classMaster.findUnique({
      where,
      ...select,
    })
  },
})

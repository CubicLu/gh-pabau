import { queryField, nonNull } from 'nexus'

export const BacsAccountFindUniqueQuery = queryField('findUniqueBacsAccount', {
  type: 'BacsAccount',
  args: {
    where: nonNull('BacsAccountWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.bacsAccount.findUnique({
      where,
      ...select,
    })
  },
})

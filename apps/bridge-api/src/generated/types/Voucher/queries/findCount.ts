import { queryField, nonNull, list } from 'nexus'

export const VoucherFindCountQuery = queryField('findManyVoucherCount', {
  type: nonNull('Int'),
  args: {
    where: 'VoucherWhereInput',
    orderBy: list('VoucherOrderByWithRelationInput'),
    cursor: 'VoucherWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('VoucherScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.voucher.count(args as any)
  },
})

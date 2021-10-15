import { queryField, nonNull, list } from 'nexus'

export const VoucherFindCountQuery = queryField('findManyVoucherCount', {
  type: nonNull('Int'),
  args: {
    where: 'VoucherWhereInput',
    orderBy: list('VoucherOrderByInput'),
    cursor: 'VoucherWhereUniqueInput',
    distinct: 'VoucherScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.voucher.count(args as any)
  },
})

import { mutationField, nonNull } from 'nexus'

export const InvWarehouseUpsertOneMutation = mutationField(
  'upsertOneInvWarehouse',
  {
    type: nonNull('InvWarehouse'),
    args: {
      where: nonNull('InvWarehouseWhereUniqueInput'),
      create: nonNull('InvWarehouseCreateInput'),
      update: nonNull('InvWarehouseUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.invWarehouse.upsert({
        ...args,
        ...select,
      })
    },
  },
)

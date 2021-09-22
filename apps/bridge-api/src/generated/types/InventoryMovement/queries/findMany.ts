import { queryField, nonNull, list } from 'nexus'

export const InventoryMovementFindManyQuery = queryField(
  'findManyInventoryMovement',
  {
    type: nonNull(list(nonNull('InventoryMovement'))),
    args: {
      where: 'InventoryMovementWhereInput',
      orderBy: list('InventoryMovementOrderByWithRelationInput'),
      cursor: 'InventoryMovementWhereUniqueInput',
      distinct: 'InventoryMovementScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.inventoryMovement.findMany({
        ...args,
        ...select,
      })
    },
  },
)

import { extendType, list } from 'nexus'
import { Context } from '../../../context'
import { InventoryCount } from '.prisma/client'
import { InventoryCountCountedTotals } from '../nexus-type'

export const InventoryCountExtended = extendType({
  type: 'InventoryCount',
  definition(t) {
    t.field('countedTotals', {
      type: InventoryCountCountedTotals,
      async resolve(parent: InventoryCount, args, ctx: Context) {
        const totalToCount = await ctx.prisma.invWarehouseProduct.aggregate({
          _sum: { quantity: true },
          where: {
            company_id: {
              equals: ctx.authenticated.company,
            },
            product_id: {
              in: (
                await ctx.prisma.invProduct.findMany({
                  select: {
                    id: true,
                  },
                  where: {
                    company_id: {
                      equals: ctx.authenticated.company,
                    },
                    category_id: {
                      in: parent.counting_categories
                        ?.split(',')
                        .map((categoryId) => Number.parseInt(categoryId)),
                    },
                  },
                })
              ).map((product) => product.id),
            },
          },
        })

        const inventoryDiscrepancy = await ctx.prisma.inventoryDiscrepancy.aggregate(
          {
            _sum: { overage: true, shortage: true, counted: true },
            where: {
              company_id: {
                equals: ctx.authenticated.company,
              },
              count_id: {
                equals: parent.id,
              },
            },
          }
        )
        return {
          totalCounted: inventoryDiscrepancy._sum?.counted,
          totalToCount: totalToCount._sum?.quantity,
          overages: inventoryDiscrepancy._sum?.overage,
          shortages: inventoryDiscrepancy._sum?.shortage,
        }
      },
    })
    t.field('serviceCategories', {
      type: list('InvCategory'),
      async resolve(parent: InventoryCount, args, ctx: Context) {
        const categoryIds = parent.counting_categories
        if (!categoryIds) {
          return []
        }

        const ids = []
        for (const item of categoryIds?.split(',')) {
          ids.push(Number.parseInt(item))
        }

        return await ctx.prisma.invCategory.findMany({
          where: {
            company_id: {
              equals: ctx.authenticated.company,
            },
            id: { in: ids },
          },
        })
      },
    })
  },
})

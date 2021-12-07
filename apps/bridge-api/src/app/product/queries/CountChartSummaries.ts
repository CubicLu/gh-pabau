import { objectType, extendType } from 'nexus'
import { Context } from '../../../context'

export const CountChartSummaries = extendType({
  type: 'Query',
  definition(t) {
    t.field('countChartSummaries', {
      type: objectType({
        name: 'CountChartSummariesResponse',
        definition(t) {
          t.int('allProducts')
          t.int('outOfStockProducts')
          t.int('lowStockProducts')
          t.int('productsToArrive')
        },
      }),
      async resolve(parent, args, ctx: Context) {
        const products = await ctx.prisma.invProduct.findMany({
          where: {
            company_id: {
              equals: ctx.authenticated.company,
            },
            is_active: {
              equals: 1,
            },
          },
          select: {
            id: true,
            alert_quantity: true,
          },
        })

        let outOfStockProducts = 0
        let lowStockProducts = 0
        for (const product of products) {
          const productQuantity = await ctx.prisma.invWarehouseProduct.aggregate(
            {
              _sum: {
                quantity: true,
              },
              where: {
                company_id: {
                  equals: ctx.authenticated.company,
                },
                product_id: {
                  equals: product.id,
                },
              },
            }
          )
          if (productQuantity?._sum?.quantity <= 0) {
            outOfStockProducts += 1
          }
          if (productQuantity?._sum?.quantity < product.alert_quantity) {
            lowStockProducts += 1
          }
        }

        const purchaseOrders = await ctx.prisma.cmPurchaseOrder.findMany({
          where: {
            company_id: {
              equals: ctx.authenticated.company,
            },
            status: {
              not: 'complete',
            },
          },
          select: {
            id: true,
          },
        })

        const productsToArrive = (
          await ctx.prisma.cmPurchaseItem.groupBy({
            by: ['product_id'],
            where: {
              order_id: {
                in: purchaseOrders.map((order) => order.id),
              },
            },
          })
        ).length

        return {
          allProducts: products.length,
          outOfStockProducts: outOfStockProducts,
          lowStockProducts: lowStockProducts,
          productsToArrive: productsToArrive,
        }
      },
    })
  },
})

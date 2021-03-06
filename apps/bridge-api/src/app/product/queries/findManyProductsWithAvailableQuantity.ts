import { Prisma } from '@prisma/client'
import {
  extendType,
  inputObjectType,
  intArg,
  nullable,
  objectType,
} from 'nexus'
import { Context } from '../../../context'

interface InvProductWithQuantitySumInput {
  skip?: number
  take?: number
  where?: {
    active?: number
    search?: string
    category?: number
    master_category?: number
    category_type: string
  }
}

interface InvProductWithQuantitySumResult {
  id: number
  name: string
  is_active: number
  cost: number
  price: number
  alert_quantity: number
  sum: number
  category_name?: string
  category_id?: number
  product_order?: number
  sku: string
  size: string
  master_cat_id?: number
  Description: string
  image?: string
  code: string
  VATRate_id?: number
  max_level: number
  supplier_id: number
  allow_negative_qty?: number
}

export const InvProductWithQuantitySumResult = objectType({
  name: 'InvProductWithQuantitySumResult',
  definition(t) {
    t.int('id')
    t.string('name')
    t.int('is_active')
    t.float('cost')
    t.float('price')
    t.int('alert_quantity')
    t.nullable.int('category_id')
    t.nullable.string('category_name')
    t.float('sum')
    t.nullable.int('product_order')
    t.string('sku')
    t.string('size')
    t.nullable.int('master_cat_id')
    t.nullable.int('supplier_id')
    t.string('Description')
    t.string('image')
    t.string('code')
    t.nullable.int('VATRate_id')
    t.int('max_level')
    t.nullable.int('allow_negative_qty')
  },
})

export const InvProductWithQuantitySumInput = inputObjectType({
  name: 'InvProductWithQuantitySumInput',
  definition(t) {
    t.nullable.int('active')
    t.nullable.string('search')
    t.nullable.int('category')
    t.nullable.string('category_type')
    t.nullable.int('master_category')
  },
})

export const InvProductWithQuantitySum = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('findManyProductsWithAvailableQuantity', {
      type: 'InvProductWithQuantitySumResult',
      description:
        'Using query raw to fetch multiple Inv Products and calculate the InvProductWarehouse available quantity',
      args: {
        where: nullable('InvProductWithQuantitySumInput'),
        skip: intArg(),
        take: intArg(),
      },
      async resolve(_root, args: InvProductWithQuantitySumInput, ctx: Context) {
        return ctx.prisma.$queryRaw<
          InvProductWithQuantitySumResult[]
        >`SELECT DISTINCT p.id, p.name, p.is_active, p.cost, p.price, p.product_order, p.alert_quantity, p.sku,
            p.size, p.image, p.Description, p.category_id, p.code, p.VATRate_id, p.max_level, p.supplier_id, p.allow_negative_qty,
            c.master_cat_id, c.name as category_name, SUM(w.quantity) as sum
            FROM inv_products p
            LEFT JOIN inv_categories c ON p.category_id = c.id
            LEFT JOIN services_master_category s ON c.master_cat_id = s.id
            LEFT JOIN inv_warehouses_products w on p.id = w.product_id
            WHERE p.occupier = ${ctx.authenticated.company}
            AND p.is_active = ${args.where.active}
            AND c.category_type IN ('retail', 'injectable', 'consumable') AND c.name != 'PACKAGES'
            ${
              args.where.search
                ? Prisma.sql`AND p.name LIKE ${'%' + args.where.search + '%'}`
                : Prisma.empty
            }
            ${
              args.where.category
                ? Prisma.sql`AND p.category_id = ${args.where.category}`
                : Prisma.empty
            }
            ${
              args.where.master_category
                ? Prisma.sql`AND c.master_cat_id = ${args.where.master_category}`
                : Prisma.empty
            }
            ${
              args.where.category_type
                ? Prisma.sql`AND c.category_type = ${args.where.category_type}`
                : Prisma.empty
            }
            GROUP BY p.id, p.product_order ORDER BY p.product_order DESC
            LIMIT ${args.skip ?? 0}, ${args.take ?? 50}`
      },
    })
    t.field('findManyProductsWithAvailableQuantityCount', {
      type: 'Int',
      description:
        'Using query raw to calculate the return rows based upon the filtering',
      args: {
        where: nullable('InvProductWithQuantitySumInput'),
      },
      async resolve(_root, args: InvProductWithQuantitySumInput, ctx: Context) {
        const result = await ctx.prisma
          .$queryRaw`SELECT COUNT(r.id) as count FROM (SELECT DISTINCT p.id
            FROM inv_products p
            LEFT JOIN inv_categories c ON p.category_id = c.id
            LEFT JOIN services_master_category s ON c.master_cat_id = s.id
            LEFT JOIN inv_warehouses_products w on p.id = w.product_id
            WHERE p.occupier = ${ctx.authenticated.company}
            AND p.is_active = ${args.where.active}
            AND c.category_type IN ('retail', 'injectable', 'consumable') AND c.name != 'PACKAGES'
            ${
              args.where.search
                ? Prisma.sql`AND p.name LIKE ${'%' + args.where.search + '%'}`
                : Prisma.empty
            }
            ${
              args.where.category
                ? Prisma.sql`AND p.category_id = ${args.where.category}`
                : Prisma.empty
            }
            ${
              args.where.master_category || args.where.master_category === 0
                ? Prisma.sql`AND c.master_cat_id = ${args.where.master_category}`
                : Prisma.empty
            }
            ${
              args.where.category_type
                ? Prisma.sql`AND c.category_type = ${args.where.category_type}`
                : Prisma.empty
            }
          ) as r
          LIMIT 1`
        return result?.[0].count ?? 0
      },
    })
  },
})

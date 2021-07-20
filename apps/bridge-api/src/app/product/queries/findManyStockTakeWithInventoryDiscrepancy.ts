import { Prisma } from '@prisma/client'
import {
  extendType,
  inputObjectType,
  intArg,
  nullable,
  objectType,
} from 'nexus'
import { Context } from '../../../context'

interface StockTakeWithInventoryDiscrepancy {
  id: number
  count_type: string
  count_name: string
  start_date: string
  status: string
  user: string
  name: string
  date_started: number
  shortage: number
  overage: number
}
interface StockTakeWithInventoryDiscrepancyInput {
  skip?: number
  take?: number
  where?: {
    search?: string
  }
}

export const StockTakeWithInventoryDiscrepancyInput = inputObjectType({
  name: 'StockTakeWithInventoryDiscrepancyInput',
  definition(t) {
    t.nullable.string('search')
  },
})

export const StockTakeSumResult = objectType({
  name: 'StockTakeSumResult',
  definition(t) {
    t.int('id')
    t.string('count_name')
    t.string('count_type')
    t.string('status')
    t.nullable.string('full_name')
    t.nullable.string('name')
    t.nullable.int('date_started')
    t.nullable.float('overage')
    t.nullable.float('shortage')
  },
})

export const StockTakeQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('findManyStockTakeWithInventoryDiscrepancy', {
      type: StockTakeSumResult,
      description:
        'Using Query Raw to fetch multiple stock take entries with inventory discrepancy',
      args: {
        skip: intArg(),
        take: intArg(),
        where: nullable('StockTakeWithInventoryDiscrepancyInput'),
      },
      async resolve(
        _root,
        args: StockTakeWithInventoryDiscrepancyInput,
        ctx: Context
      ) {
        return await ctx.prisma.$queryRaw<
          StockTakeWithInventoryDiscrepancy[]
        >`SELECT c.id, count_type, count_name, status, u.full_name, c.date_started, b.name,
        SUM(d.overage) as overage, SUM(d.shortage) as shortage FROM inventory_count c
        LEFT JOIN users u ON u.id = c.staff_id
        LEFT JOIN company_branches b ON b.id = c.location_id
        LEFT JOIN inventory_discrepancy d ON d.count_id = c.id
        WHERE c.company_id = ${ctx.authenticated.company}
        ${
          args.where.search
            ? Prisma.sql`AND (c.count_name LIKE ${
                '%' + args.where.search + '%'
              } OR u.full_name LIKE ${
                '%' + args.where.search + '%'
              } OR b.name LIKE ${'%' + args.where.search + '%'})`
            : Prisma.empty
        }
        GROUP BY c.id ORDER BY c.id DESC
        LIMIT ${args.skip ?? 0}, ${args.take ?? 50}`
      },
    })
  },
})

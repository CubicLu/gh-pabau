import { extendType, intArg, list, objectType } from 'nexus'
import { Context } from '../../../context'

export const MainInvoice = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('findManyInvoice', {
      type: objectType({
        name: 'InvoiceData',
        description: 'Invoice data simple response',
        definition(t) {
          t.int('id')
          t.string('guid')
          t.field('date', { type: 'DateTime' })
          t.int('customer_id')
          t.string('customer_name')
          t.float('paid_amount')
          t.float('discount_amount')
          t.float('inv_total')
          t.string('location_name')
          t.string('billers')
          t.string('issue_to')
          t.string('reference_no')
          t.float('credit_amount')
          t.string('custom_id')
        },
      }),
      description:
        'Get Invoices per customer or invoice no (custom_id), other field to be implemented',
      args: {
        where: 'InvSaleWhereInput',
        orderBy: list('InvSaleOrderByWithRelationInput'),
        cursor: 'InvSaleWhereUniqueInput',
        skip: intArg({
          default: 0,
        }),
        take: intArg({
          default: 50,
        }),
      },
      async resolve(_root, input, ctx: Context) {
        const query = generateInvoiceQuery(ctx, input, [
          "a.reference_no!='**REFUND**' ",
          "a.reference_no!='ACCOUNT PAYMENT'",
        ])
        console.info('-->', query)
        return await ctx.prisma.$queryRaw(query)
      },
    })
    t.list.field('findManyPayments', {
      type: objectType({
        name: 'InvPaymentSimple',
        description: 'Payments data simple response',
        definition(t) {
          t.int('id')
          t.field('date', { type: 'DateTime' })
          t.field('created_date', { type: 'DateTime' })
          t.float('amount')
          t.float('pmethod')
          t.string('location')
          t.string('biller')
          t.string('invoice_no')
          t.string('user')
        },
      }),
      description: 'Get Payments per customer other field to be implemented',
      args: {
        where: 'InvSaleWhereInput',
        skip: intArg({
          default: 0,
        }),
        take: intArg({
          default: 50,
        }),
      },
      async resolve(_root, input, ctx: Context) {
        const query = `SELECT * from
        (
          SELECT
            a.id,
            a.amount,
            a.pmethod,
            FROM_UNIXTIME(a.date) as created_date,
            datetime as date,
            b.name as location,
            c.name as biller,
            s.custom_id as invoice_no,
            d.full_name as user
          FROM inv_payments a
          inner join inv_sales s on s.id=a.invoice
          left join company_branches b on b.id=s.location_id
          left join inv_billers c on c.id=s.biller_id
          left join users d on d.id=a.uid
          where a.occupier = ${ctx.authenticated.company} and a.contact_id=${input?.where?.customer_id?.equals}

          union

          SELECT
            a.id,
            a.inv_total as amount,
            if(reference_no='**REFUND**' ,concat('refund/',IFNULL(a.paid_by,'card')), 'account payment') as pmethod,
            date as created_date,
            date,
            b.name as location,
            c.name as biller,
            c.custom_id as invoice_no,
            d.full_name as user
          from inv_sales a
          left join company_branches b on b.id=a.location_id
          left join inv_billers c on c.id=a.biller_id
          left join users d on d.id=a.uid
          where
          a.occupier = ${ctx.authenticated.company} and reference_no in ("**REFUND**", "ACCOUNT BALANCE") and a.customer_id = ${input?.where?.customer_id?.equals}
        )t
        order by date desc
        LIMIT ${input.take}
        OFFSET ${input.skip}`

        return await ctx.prisma.$queryRaw(query)
      },
    })
    t.field('countInvoice', {
      type: 'Int',
      description: 'Real count of invoices',
      args: {
        where: 'InvSaleWhereInput',
        cursor: 'InvSaleWhereUniqueInput',
      },
      async resolve(_root, input, ctx: Context) {
        const query = generateInvoiceCountQuery(ctx, input, [
          "a.reference_no!='**REFUND**' ",
          "a.reference_no!='ACCOUNT PAYMENT'",
        ])
        const invoices = await ctx.prisma.$queryRaw(query)

        return invoices[0]?.count ?? 0
      },
    })
  },
})

const generateInvoiceQuery = (
  ctx: Context,
  input: any,
  whereClause: Array<string> = []
) => {
  whereClause.push(`a.occupier = ${ctx.authenticated.company}`)
  if (input?.where?.customer_id?.equals)
    whereClause.push(`a.customer_id = ${input.where.customer_id.equals}`)
  if (input?.where?.custom_id?.equals)
    whereClause.push(`a.custom_id = ${input.where.custom_id.equals}`)
  if (input?.cursor) whereClause.push(` a.id > ${input?.cursor}`)

  const query = `SELECT
              max(a.id) as id,
              a.guid,
              a.date,
              a.customer_id,
              a.customer_name,
              a.custom_id,
              sum(a.paid_amount)-sum(a.credit_amount) as paid_amount,
              sum(a.discount_amount) as discount_amount,
              sum(a.inv_total) as inv_total,
              sum(a.credit_amount) as credit_amount,
              b.name as location_name,
              a.location_id,
              group_concat(Distinct d.name) as billers,
              if(e.id is null, concat(fname,' ',lname),e.insurer_name) as issue_to
          FROM inv_sales a
              LEFT JOIN company_branches b on b.id = a.location_id
              LEFT JOIN cm_contacts c on c.id = a.customer_id
              LEFT JOIN inv_billers d ON a.biller_id=d.id
              LEFT JOIN insurance_details e ON a.insurer_contract_id=e.id
          WHERE
              ${whereClause.join(' AND ')}
              AND a.guid!='' AND a.guid IS NOT NULL
              AND b.name!='' AND b.name IS NOT NULL
          GROUP BY IFNULL(a.guid, a.id)
          ORDER BY a.date desc
          LIMIT ${input.take}
          OFFSET ${input.skip}`
  return query
}

const generateInvoiceCountQuery = (
  ctx: Context,
  input: any,
  whereClause: Array<string> = []
) => {
  whereClause.push(`a.occupier = ${ctx.authenticated.company}`)
  if (input?.where?.customer_id?.equals)
    whereClause.push(`a.customer_id = ${input.where.customer_id.equals}`)
  if (input?.where?.custom_id?.equals)
    whereClause.push(`a.custom_id = ${input.where.custom_id.equals}`)
  if (input?.cursor) whereClause.push(` a.id > ${input?.cursor}`)

  const query = `SELECT count(DISTINCT a.guid) as count
          from inv_sales a
          LEFT JOIN company_branches b on b.id = a.location_id
          WHERE
          ${whereClause.join(' AND ')}
          AND a.guid!='' AND a.guid IS NOT NULL AND b.name!='' AND b.name IS NOT NULL`

  return query
}

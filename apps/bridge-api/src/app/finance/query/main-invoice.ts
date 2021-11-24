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
      type: 'Json',
      description: 'Get Payments per customer other field to be implemented',
      args: {
        contact_id: 'Int',
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
          where a.occupier = ${ctx.authenticated.company} and a.contact_id=${input?.contact_id}

          union

          SELECT
            a.id,
            a.inv_total as amount,
            CASE
                WHEN reference_no='**REFUND**'  THEN concat('refund/',a.paid_by)
                WHEN reference_no='**CREDIT NOTE**'  THEN 'credit'
                WHEN reference_no='ACCOUNT PAYMENT'  THEN 'on account'
                ELSE a.paid_by
            END as pmethod,
            date as created_date,
            date,
            b.name as location,
            c.name as biller,
            a.custom_id as invoice_no,
            d.full_name as user
          from inv_sales a
          left join company_branches b on b.id=a.location_id
          left join inv_billers c on c.id=a.biller_id
          left join users d on d.id=a.uid
          where
          a.occupier = ${ctx.authenticated.company} and reference_no in ("**REFUND**", "ACCOUNT PAYMENT","**CREDIT NOTE**") and a.customer_id = ${input?.contact_id}
        )t
        order by date desc
        LIMIT ${input.take}
        OFFSET ${input.skip}`

        return await ctx.prisma.$queryRaw(query)
      },
    })
    t.list.field('findManySoldItems', {
      type: 'Json',
      description: 'Get Sold Items per Customer ID',
      args: {
        contact_id: 'Int',
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
            SELECT a.id,
            a.date,
            b.product_name,
            b.unit_price,
            b.gross_total,
            b.quantity,
            b.val_tax,
            u.full_name as biller_name,
            a.custom_id,
            IF(d.category_type is null, if(product_category_type is null, 'service', product_category_type), category_type) as type
          FROM   inv_sales a
            LEFT JOIN inv_sale_items b ON a.id = b.sale_id
            LEFT JOIN inv_products c ON b.product_id = c.id
            LEFT JOIN inv_categories d ON c.category_id = d.id
            LEFT JOIN users u	ON a.uid = u.id
            LEFT JOIN company_details e ON e.company_id=a.occupier
          WHERE  a.occupier= ${ctx.authenticated.company} and a.reference_no not in ("**REFUND**", "**CREDIT NOTE**", "ACCOUNT PAYMENT")
            AND a.customer_id = ${input?.contact_id}
            AND a.refund_to = 0
          UNION
          SELECT s.id,
            s.date AS date,
            CONCAT(c.name, ' - PK USED') as product_name,
            (c.price / c.session_count) AS unit_price,
            (c.price / c.session_count) as gross_total,
            CONCAT('1','/', c.session_count) as quantity,
            0 as val_tax,
            s.biller_name,
            s.custom_id,
            'service' as type
          FROM   contact_packages a
            LEFT JOIN contact_package_used b	ON b.contact_package_id = a.id
            LEFT JOIN session_packages c ON a.package_id = c.id
            LEFT JOIN inv_sales s ON s.id = a.invoice_id
            LEFT JOIN company_details e ON e.company_id=a.occupier
          WHERE
          contact_id = ${input?.contact_id}
          and a.occupier = ${ctx.authenticated.company}
        )t
        order by date desc
        LIMIT ${input.take}
        OFFSET ${input.skip}`
        return await ctx.prisma.$queryRaw(query)
      },
    })
    t.field('countPayments', {
      type: 'Json',
      description: 'Real count of payments',
      args: {
        contact_id: 'Int',
      },
      async resolve(_root, input, ctx: Context) {
        const payments = await ctx.prisma
          .$queryRaw(`SELECT sum(count) as count, sum(amount) as amount from
          (
            SELECT
              count(a.id) as count, sum(a.amount) as amount
            FROM inv_payments a
            inner join inv_sales s on s.id=a.invoice
            where a.occupier = ${ctx.authenticated.company} and a.contact_id=${input?.contact_id}

            union

            SELECT
            count(id) as count, sum(IF(reference_no="**CREDIT NOTE**" or reference_no="ACCOUNT PAYMENT",0,a.total)) as amount
            from inv_sales a
            where
            a.occupier = ${ctx.authenticated.company} and reference_no in ("**REFUND**", "ACCOUNT PAYMENT","**CREDIT NOTE**") and a.customer_id = ${input?.contact_id}
          )t`)
        return payments
      },
    })
    t.field('countSoldItems', {
      type: 'Int',
      description: 'Real count of items',
      args: {
        contact_id: 'Int',
      },
      async resolve(_root, input, ctx: Context) {
        const invoices = await ctx.prisma
          .$queryRaw(`SELECT sum(count) as count from (
              SELECT count(a.id) as count
              FROM   inv_sales a
              WHERE  a.occupier= ${ctx.authenticated.company} and a.reference_no not in ("**REFUND**", "**CREDIT NOTE**", "ACCOUNT PAYMENT") AND a.customer_id = ${input?.contact_id} AND a.refund_to = 0
              UNION
            SELECT count(b.id) as count
            FROM   contact_packages a
              LEFT JOIN contact_package_used b	ON b.contact_package_id = a.id
            WHERE a.contact_id = ${input?.contact_id} and a.occupier = ${ctx.authenticated.company}
            )t`)
        return invoices[0]?.count ?? 0
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
    t.list.field('findManySoldItems', {
      type: 'Json',
      description: 'Get Sold Items per Customer ID',
      args: {
        contact_id: 'Int',
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
            SELECT a.id,
            a.date,
            b.product_name,
            b.unit_price,
            b.gross_total,
            b.quantity,
            b.val_tax,
            u.full_name as biller_name,
            a.custom_id,
            IF(d.category_type is null, if(product_category_type is null, 'service', product_category_type), category_type) as type
          FROM   inv_sales a
            LEFT JOIN inv_sale_items b ON a.id = b.sale_id
            LEFT JOIN inv_products c ON b.product_id = c.id
            LEFT JOIN inv_categories d ON c.category_id = d.id
            LEFT JOIN users u	ON a.uid = u.id
            LEFT JOIN company_details e ON e.company_id=a.occupier
          WHERE  a.occupier= ${ctx.authenticated.company} and a.reference_no not in ("**REFUND**", "**CREDIT NOTE**", "ACCOUNT PAYMENT")
            AND a.customer_id = ${input?.contact_id}
            AND a.refund_to = 0
          UNION
          SELECT s.id,
            s.date                            AS date,
            CONCAT(c.name, ' - PK USED') as product_name,
            (c.price / c.session_count) AS unit_price,
            (c.price / c.session_count) as gross_total,
            CONCAT('1','/', c.session_count) as quantity,
            0 as val_tax,
            s.biller_name,
            s.custom_id,
            'service' as type
          FROM   contact_packages a
            LEFT JOIN contact_package_used b	ON b.contact_package_id = a.id
            LEFT JOIN session_packages c ON a.package_id = c.id
            LEFT JOIN inv_sales s ON s.id = a.invoice_id
            LEFT JOIN company_details e ON e.company_id=a.occupier
          WHERE
          contact_id = ${input?.contact_id}
          and a.occupier = ${ctx.authenticated.company}
        )t
        order by date desc
        LIMIT ${input.take}
        OFFSET ${input.skip}`

        return await ctx.prisma.$queryRaw(query)
      },
    })
    t.field('countSoldItems', {
      type: 'Int',
      description: 'Real count of items',
      args: {
        contact_id: 'Int',
      },
      async resolve(_root, input, ctx: Context) {
        const invoices = await ctx.prisma
          .$queryRaw(`SELECT sum(count) as count from (
            SELECT count(a.id) as count
            FROM   inv_sales a
            LEFT JOIN inv_sale_items b ON a.id = b.sale_id
            WHERE  a.occupier= ${ctx.authenticated.company} and a.reference_no not in ("**REFUND**", "**CREDIT NOTE**", "ACCOUNT PAYMENT") AND a.customer_id = ${input?.contact_id} AND a.refund_to = 0
              UNION
            SELECT count(DISTINCT s.id) as count
            FROM   contact_packages a
              LEFT JOIN contact_package_used b	ON b.contact_package_id = a.id
              LEFT JOIN inv_sales s ON s.id = a.invoice_id
            WHERE contact_id = ${input?.contact_id} and a.occupier = ${ctx.authenticated.company}
            )t`)

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

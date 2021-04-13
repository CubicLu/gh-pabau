import { objectType, arg, extendType } from 'nexus'

export const InvPayment = objectType({
  name: 'InvPayment',
  definition(t) {
    t.model.id()
    t.model.from()
    t.model.date()
    t.model.amount()
    t.model.invoice()
    t.model.pmethod()
    t.model.account_balance()
    t.model.contact_id()
    t.model.company_id()
    t.model.order_id()
    t.model.uid()
    t.model.card_type()
    t.model.charge_amount()
    t.model.card_digits()
    t.model.datetime()
    t.model.note()
    t.model.new_way2()
    t.model.new_way3()
    t.model.ref_num()
    t.model.custom_pmethod()
    t.model.xero_payment_id()
    t.model.is_insurance()
    t.model.payment_id()
    t.model.custom_id()
    t.model.imported()
    t.model.custom_contact_id()
    t.model.custom_contact_name()
    t.model.custom_invoice_id()
    t.model.insurer_id()
    t.model.is_credit_note()
    t.model.CmContact()
    t.model.User()
    t.model.Company()
  },
})

export const invPaymentQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.invPayment()
    t.field('findFirstInvPayment', {
      type: 'InvPayment',
      args: {
        where: 'InvPaymentWhereInput',
        orderBy: arg({ type: 'InvPaymentOrderByInput' }),
        cursor: 'InvPaymentWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.invPayment.findFirst(args as any)
      },
    })
    t.crud.invPayments({ filtering: true, ordering: true })
    t.field('invPaymentsCount', {
      type: 'Int',
      args: {
        where: 'InvPaymentWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.invPayment.count(args as any)
      },
    })
  },
})

export const invPaymentMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneInvPayment()
    t.crud.updateOneInvPayment()
    t.crud.upsertOneInvPayment()
    t.crud.deleteOneInvPayment()
    t.crud.updateManyInvPayment()
  },
})

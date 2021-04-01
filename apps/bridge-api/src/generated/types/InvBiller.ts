import { objectType, arg, extendType } from 'nexus'

export const InvBiller = objectType({
  name: 'InvBiller',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.company()
    t.model.cui()
    t.model.reg()
    t.model.cnp()
    t.model.serie()
    t.model.account_no()
    t.model.bank()
    t.model.address()
    t.model.city()
    t.model.state()
    t.model.postal_code()
    t.model.country()
    t.model.phone()
    t.model.email()
    t.model.logo()
    t.model.invoice_footer()
    t.model.company_id()
    t.model.uid()
    t.model.created_date()
    t.model.modified_date()
    t.model.custom_id()
    t.model.imported()
    t.model.qualification()
    t.model.is_disabled()
    t.model.User()
    t.model.Company()
  },
})

export const invBillerQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.invBiller()
    t.field('findFirstInvBiller', {
      type: 'InvBiller',
      args: {
        where: 'InvBillerWhereInput',
        orderBy: arg({ type: 'InvBillerOrderByInput' }),
        cursor: 'InvBillerWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.invBiller.findFirst(args as any)
      },
    })
    t.crud.invBillers({ filtering: true, ordering: true })
    t.field('invBillersCount', {
      type: 'Int',
      args: {
        where: 'InvBillerWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.invBiller.count(args as any)
      },
    })
  },
})

export const invBillerMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneInvBiller()
    t.crud.updateOneInvBiller()
    t.crud.upsertOneInvBiller()
    t.crud.deleteOneInvBiller()
    t.crud.updateManyInvBiller()
  },
})

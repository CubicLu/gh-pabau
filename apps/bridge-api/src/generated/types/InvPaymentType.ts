import { objectType, arg, extendType } from 'nexus'

export const InvPaymentType = objectType({
  name: 'InvPaymentType',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.epos_display()
    t.model.description()
    t.model.company_id()
    t.model.uid()
    t.model.created_date()
    t.model.modified_date()
    t.model.is_active()
    t.model.is_money()
    t.model.type()
    t.model.GlCode()
  },
})

export const invPaymentTypeQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.invPaymentType()
    t.field('findFirstInvPaymentType', {
      type: 'InvPaymentType',
      args: {
        where: 'InvPaymentTypeWhereInput',
        orderBy: arg({ type: 'InvPaymentTypeOrderByInput' }),
        cursor: 'InvPaymentTypeWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.invPaymentType.findFirst(args as any)
      },
    })
    t.crud.invPaymentTypes({ filtering: true, ordering: true })
    t.field('invPaymentTypesCount', {
      type: 'Int',
      args: {
        where: 'InvPaymentTypeWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.invPaymentType.count(args as any)
      },
    })
  },
})

export const invPaymentTypeMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneInvPaymentType()
    t.crud.updateOneInvPaymentType()
    t.crud.upsertOneInvPaymentType()
    t.crud.deleteOneInvPaymentType()
    t.crud.updateManyInvPaymentType()
    t.crud.deleteManyInvPaymentType()
  },
})

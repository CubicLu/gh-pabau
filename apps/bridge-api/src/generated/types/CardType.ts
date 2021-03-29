import { objectType, arg, extendType } from 'nexus'

export const CardType = objectType({
  name: 'CardType',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.mastercard()
    t.model.visa()
    t.model.amex()
    t.model.visa_credit()
    t.model.maestro()
    t.model.worldpay()
    t.model.visa_credit_charge()
    t.model.amex_credit_charge()
    t.model.mastercard_credit_charge()
    t.model.enable_reference()
  },
})

export const cardTypeQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.cardType()
    t.field('findFirstCardType', {
      type: 'CardType',
      args: {
        where: 'CardTypeWhereInput',
        orderBy: arg({ type: 'CardTypeOrderByInput' }),
        cursor: 'CardTypeWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cardType.findFirst(args as any)
      },
    })
    t.crud.cardTypes({ filtering: true, ordering: true })
    t.field('cardTypesCount', {
      type: 'Int',
      args: {
        where: 'CardTypeWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cardType.count(args as any)
      },
    })
  },
})

export const cardTypeMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCardType()
    t.crud.updateOneCardType()
    t.crud.upsertOneCardType()
    t.crud.deleteOneCardType()
  },
})

import { objectType, arg, extendType } from 'nexus'

export const CmCouponClick = objectType({
  name: 'CmCouponClick',
  definition(t) {
    t.model.id()
    t.model.coupon_id()
    t.model.click_date()
    t.model.CmCoupon()
  },
})

export const cmCouponClickQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.cmCouponClick()
    t.field('findFirstCmCouponClick', {
      type: 'CmCouponClick',
      args: {
        where: 'CmCouponClickWhereInput',
        orderBy: arg({ type: 'CmCouponClickOrderByInput' }),
        cursor: 'CmCouponClickWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmCouponClick.findFirst(args as any)
      },
    })
    t.crud.cmCouponClicks({ filtering: true, ordering: true })
    t.field('cmCouponClicksCount', {
      type: 'Int',
      args: {
        where: 'CmCouponClickWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmCouponClick.count(args as any)
      },
    })
  },
})

export const cmCouponClickMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCmCouponClick()
    t.crud.updateOneCmCouponClick()
    t.crud.upsertOneCmCouponClick()
    t.crud.deleteOneCmCouponClick()
    t.crud.updateManyCmCouponClick()
  },
})

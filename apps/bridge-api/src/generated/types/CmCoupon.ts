import { objectType, arg, extendType } from 'nexus'

export const CmCoupon = objectType({
  name: 'CmCoupon',
  definition(t) {
    t.model.id()
    t.model.coupon_title()
    t.model.coupon_details()
    t.model.coupon_image()
    t.model.coupon_start_date()
    t.model.coupon_expiry_date()
    t.model.coupon_code()
    t.model.coupon_amount()
    t.model.coupon_rate_type()
    t.model.coupon_created_date()
    t.model.company_id()
    t.model.created_by()
    t.model.coupon_impressions()
    t.model.coupons_sent()
    t.model.coupon_max_amount()
    t.model.CmCouponClaimed()
    t.model.CmCouponClick()
  },
})

export const cmCouponQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.cmCoupon()
    t.field('findFirstCmCoupon', {
      type: 'CmCoupon',
      args: {
        where: 'CmCouponWhereInput',
        orderBy: arg({ type: 'CmCouponOrderByInput' }),
        cursor: 'CmCouponWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmCoupon.findFirst(args as any)
      },
    })
    t.crud.cmCoupons({ filtering: true, ordering: true })
    t.field('cmCouponsCount', {
      type: 'Int',
      args: {
        where: 'CmCouponWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmCoupon.count(args as any)
      },
    })
  },
})

export const cmCouponMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCmCoupon()
    t.crud.updateOneCmCoupon()
    t.crud.upsertOneCmCoupon()
    t.crud.deleteOneCmCoupon()
    t.crud.updateManyCmCoupon()
  },
})

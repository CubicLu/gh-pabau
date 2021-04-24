import { objectType, arg, extendType } from 'nexus'

export const CmCouponClaimed = objectType({
  name: 'CmCouponClaimed',
  definition(t) {
    t.model.id()
    t.model.coupon_id()
    t.model.claim_date()
    t.model.claim_full_name()
    t.model.claim_email()
    t.model.active()
    t.model.CmCoupon()
  },
})

export const cmCouponClaimedQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.cmCouponClaimed()
    t.field('findFirstCmCouponClaimed', {
      type: 'CmCouponClaimed',
      args: {
        where: 'CmCouponClaimedWhereInput',
        orderBy: arg({ type: 'CmCouponClaimedOrderByInput' }),
        cursor: 'CmCouponClaimedWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmCouponClaimed.findFirst(args as any)
      },
    })
    t.crud.cmCouponClaimeds({ filtering: true, ordering: true })
    t.field('cmCouponClaimedsCount', {
      type: 'Int',
      args: {
        where: 'CmCouponClaimedWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmCouponClaimed.count(args as any)
      },
    })
  },
})

export const cmCouponClaimedMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCmCouponClaimed()
    t.crud.updateOneCmCouponClaimed()
    t.crud.upsertOneCmCouponClaimed()
    t.crud.deleteOneCmCouponClaimed()
    t.crud.updateManyCmCouponClaimed()
  },
})

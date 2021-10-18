import { objectType } from 'nexus'

export const CmCoupon = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmCoupon',
  definition(t) {
    t.int('id')
    t.string('coupon_title')
    t.string('coupon_details')
    t.string('coupon_image')
    t.string('coupon_start_date')
    t.string('coupon_expiry_date')
    t.string('coupon_code')
    t.string('coupon_amount')
    t.string('coupon_rate_type')
    t.field('coupon_created_date', { type: 'DateTime' })
    t.int('company_id')
    t.int('created_by')
    t.int('coupon_impressions')
    t.int('coupons_sent')
    t.int('coupon_max_amount')
    t.list.field('CmCouponClaimed', {
      type: 'CmCouponClaimed',
      args: {
        where: 'CmCouponClaimedWhereInput',
        orderBy: 'CmCouponClaimedOrderByWithRelationInput',
        cursor: 'CmCouponClaimedWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmCouponClaimedScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmCouponClaimed
      },
    })
    t.list.field('CmCouponClick', {
      type: 'CmCouponClick',
      args: {
        where: 'CmCouponClickWhereInput',
        orderBy: 'CmCouponClickOrderByWithRelationInput',
        cursor: 'CmCouponClickWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmCouponClickScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmCouponClick
      },
    })
    t.nullable.field('_count', {
      type: 'CmCouponCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})

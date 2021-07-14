import { objectType } from 'nexus'

export const CmCouponClaimed = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmCouponClaimed',
  definition(t) {
    t.int('id')
    t.int('coupon_id')
    t.field('claim_date', { type: 'DateTime' })
    t.string('claim_full_name')
    t.string('claim_email')
    t.int('active')
    t.field('CmCoupon', {
      type: 'CmCoupon',
      resolve(root: any) {
        return root.CmCoupon
      },
    })
  },
})

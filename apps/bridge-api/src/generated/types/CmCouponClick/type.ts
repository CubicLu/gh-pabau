import { objectType } from 'nexus'

export const CmCouponClick = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmCouponClick',
  definition(t) {
    t.int('id')
    t.int('coupon_id')
    t.field('click_date', { type: 'DateTime' })
    t.field('CmCoupon', {
      type: 'CmCoupon',
      resolve(root: any) {
        return root.CmCoupon
      },
    })
  },
})

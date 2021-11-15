import { objectType } from 'nexus'

export const CmDrug = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmDrug',
  definition(t) {
    t.int('id')
    t.string('name')
    t.int('company_id')
    t.string('dosage')
    t.string('units')
    t.string('frequency')
    t.string('route')
    t.string('comment')
    t.boolean('is_active')
    t.int('product_id')
    t.string('lot_number')
    t.nullable.field('expiry_date', { type: 'DateTime' })
    t.nullable.int('field_order')
    t.int('is_vaccine')
    t.int('is_required')
    t.string('custom_id')
    t.int('max_age')
    t.int('min_age')
    t.string('nathnac_link')
    t.string('travax_link')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.field('InvProduct', {
      type: 'InvProduct',
      resolve(root: any) {
        return root.InvProduct
      },
    })
  },
})

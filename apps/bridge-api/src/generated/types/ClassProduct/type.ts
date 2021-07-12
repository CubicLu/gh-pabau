import { objectType } from 'nexus'

export const ClassProduct = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ClassProduct',
  definition(t) {
    t.int('id')
    t.string('code')
    t.string('name')
    t.nullable.string('unit')
    t.string('size')
    t.nullable.int('product_order')
    t.string('um')
    t.nullable.float('cost')
    t.float('price')
    t.int('alert_quantity')
    t.nullable.string('image')
    t.int('category_id')
    t.int('company_id')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.int('uid')
    t.nullable.field('created_date', { type: 'DateTime' })
    t.nullable.field('modified_date', { type: 'DateTime' })
    t.string('product_desc')
  },
})

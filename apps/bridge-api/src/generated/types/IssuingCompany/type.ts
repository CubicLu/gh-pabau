import { objectType } from 'nexus'

export const IssuingCompany = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'IssuingCompany',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.boolean('is_active')
    t.string('name')
    t.string('abbreviation')
    t.string('address')
    t.string('address2')
    t.string('city')
    t.string('postcode')
    t.string('website')
    t.string('email')
    t.string('phone')
    t.string('vat_registered')
    t.int('invoice_template_id')
    t.int('custom_id')
    t.nullable.string('invoice_prefix')
    t.nullable.int('invoice_starting_number')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.list.field('InvSale', {
      type: 'InvSale',
      args: {
        where: 'InvSaleWhereInput',
        orderBy: 'InvSaleOrderByWithRelationInput',
        cursor: 'InvSaleWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InvSaleScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InvSale
      },
    })
    t.field('_count', {
      type: 'IssuingCompanyCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})

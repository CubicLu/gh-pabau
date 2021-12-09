import { objectType } from 'nexus'

export const InvBiller = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'InvBiller',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('company')
    t.string('cui')
    t.string('reg')
    t.string('cnp')
    t.string('serie')
    t.string('account_no')
    t.string('bank')
    t.string('address')
    t.string('city')
    t.string('state')
    t.string('postal_code')
    t.string('country')
    t.string('phone')
    t.string('email')
    t.string('logo')
    t.string('invoice_footer')
    t.nullable.int('company_id')
    t.nullable.int('uid')
    t.nullable.field('created_date', { type: 'DateTime' })
    t.nullable.field('modified_date', { type: 'DateTime' })
    t.int('custom_id')
    t.int('imported')
    t.string('qualification')
    t.boolean('is_disabled')
    t.nullable.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
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
      type: 'InvBillerCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})

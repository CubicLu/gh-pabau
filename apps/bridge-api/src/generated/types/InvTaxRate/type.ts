import { objectType } from 'nexus'

export const InvTaxRate = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'InvTaxRate',
  definition(t) {
    t.int('id')
    t.string('name')
    t.float('rate')
    t.string('type')
    t.nullable.int('company_id')
    t.nullable.int('user_id')
    t.nullable.field('created_date', { type: 'DateTime' })
    t.nullable.field('modified_date', { type: 'DateTime' })
    t.int('is_active')
    t.nullable.string('description')
    t.boolean('date_constrained')
    t.int('start_date')
    t.int('end_date')
    t.int('show_on_receipt')
    t.int('custom_id')
    t.boolean('offer')
    t.nullable.string('offer_name')
    t.boolean('online')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
    t.list.field('DiscountDisableLocation', {
      type: 'DiscountDisableLocation',
      args: {
        where: 'DiscountDisableLocationWhereInput',
        orderBy: 'DiscountDisableLocationOrderByWithRelationInput',
        cursor: 'DiscountDisableLocationWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'DiscountDisableLocationScalarFieldEnum',
      },
      resolve(root: any) {
        return root.DiscountDisableLocation
      },
    })
    t.list.field('DiscountDisableUser', {
      type: 'DiscountDisableUser',
      args: {
        where: 'DiscountDisableUserWhereInput',
        orderBy: 'DiscountDisableUserOrderByWithRelationInput',
        cursor: 'DiscountDisableUserWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'DiscountDisableUserScalarFieldEnum',
      },
      resolve(root: any) {
        return root.DiscountDisableUser
      },
    })
    t.list.field('DiscountDisableProduct', {
      type: 'DiscountDisableProduct',
      args: {
        where: 'DiscountDisableProductWhereInput',
        orderBy: 'DiscountDisableProductOrderByWithRelationInput',
        cursor: 'DiscountDisableProductWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'DiscountDisableProductScalarFieldEnum',
      },
      resolve(root: any) {
        return root.DiscountDisableProduct
      },
    })
    t.list.field('DiscountDisableService', {
      type: 'DiscountDisableService',
      args: {
        where: 'DiscountDisableServiceWhereInput',
        orderBy: 'DiscountDisableServiceOrderByWithRelationInput',
        cursor: 'DiscountDisableServiceWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'DiscountDisableServiceScalarFieldEnum',
      },
      resolve(root: any) {
        return root.DiscountDisableService
      },
    })
    t.field('_count', {
      type: 'InvTaxRateCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})

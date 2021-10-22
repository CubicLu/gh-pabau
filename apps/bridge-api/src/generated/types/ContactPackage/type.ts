import { objectType } from 'nexus'

export const ContactPackage = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ContactPackage',
  definition(t) {
    t.int('id')
    t.int('contact_id')
    t.int('package_id')
    t.nullable.int('invoice_id')
    t.field('activation_date', { type: 'DateTime' })
    t.field('expiration_date', { type: 'DateTime' })
    t.nullable.int('company_id')
    t.field('CreatedDate', { type: 'DateTime' })
    t.int('sold_by')
    t.string('code')
    t.int('voided')
    t.int('voided_by')
    t.string('custom_status')
    t.int('imported')
    t.string('package_code')
    t.int('old_invoice_id')
    t.int('custom_id')
    t.nullable.field('contact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.contact
      },
    })
    t.nullable.field('invoice', {
      type: 'InvSale',
      resolve(root: any) {
        return root.invoice
      },
    })
    t.nullable.field('Package', {
      type: 'Package',
      resolve(root: any) {
        return root.Package
      },
    })
    t.list.field('contact_package_used', {
      type: 'PackageUsed',
      args: {
        where: 'PackageUsedWhereInput',
        orderBy: 'PackageUsedOrderByWithRelationInput',
        cursor: 'PackageUsedWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PackageUsedScalarFieldEnum',
      },
      resolve(root: any) {
        return root.contact_package_used
      },
    })
    t.nullable.field('_count', {
      type: 'ContactPackageCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})

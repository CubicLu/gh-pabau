import { objectType } from 'nexus'

export const PackageUsed = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'PackageUsed',
  definition(t) {
    t.int('id')
    t.int('contact_package_id')
    t.field('date_created', { type: 'DateTime' })
    t.int('booking_id')
    t.string('status')
    t.int('book_take')
    t.int('cancel_take')
    t.nullable.int('company_id')
    t.int('booking_master_id')
    t.int('old_booking_id')
    t.nullable.field('contact_package', {
      type: 'ContactPackage',
      resolve(root: any) {
        return root.contact_package
      },
    })
  },
})

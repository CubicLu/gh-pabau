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
    t.nullable.int('booking_id')
    t.string('status')
    t.int('book_take')
    t.int('cancel_take')
    t.nullable.int('company_id')
    t.int('booking_master_id')
    t.nullable.field('ContactPackage', {
      type: 'ContactPackage',
      resolve(root: any) {
        return root.ContactPackage
      },
    })
    t.nullable.field('Booking', {
      type: 'Booking',
      resolve(root: any) {
        return root.Booking
      },
    })
  },
})

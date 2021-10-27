import { objectType } from 'nexus'

export const UserMaster = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'UserMaster',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('fname')
    t.string('lname')
    t.string('address')
    t.string('city')
    t.string('state')
    t.string('country')
    t.string('postalcode')
    t.string('prefloc')
    t.string('email')
    t.string('pass')
    t.string('oauth_provider')
    t.string('oauth_id')
    t.field('timestamp', { type: 'DateTime' })
    t.string('enc_key')
    t.string('pic')
    t.int('contact_id')
    t.string('mobile')
    t.nullable.field('last_login', { type: 'DateTime' })
    t.boolean('is_suspended')
    t.string('session_hash')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.list.field('SalonBookings', {
      type: 'Booking',
      args: {
        where: 'BookingWhereInput',
        orderBy: 'BookingOrderByWithRelationInput',
        cursor: 'BookingWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'BookingScalarFieldEnum',
      },
      resolve(root: any) {
        return root.SalonBookings
      },
    })
    t.nullable.field('_count', {
      type: 'UserMasterCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})

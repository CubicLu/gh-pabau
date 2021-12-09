import { objectType } from 'nexus'

export const CancelReason = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CancelReason',
  definition(t) {
    t.int('id')
    t.string('reason_name')
    t.int('company_id')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.int('late_cancel')
    t.int('apply_cancellation_policy')
    t.nullable.field('created_at', { type: 'DateTime' })
    t.nullable.field('modified_at', { type: 'DateTime' })
    t.list.field('BookingCancel', {
      type: 'BookingCancel',
      args: {
        where: 'BookingCancelWhereInput',
        orderBy: 'BookingCancelOrderByWithRelationInput',
        cursor: 'BookingCancelWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'BookingCancelScalarFieldEnum',
      },
      resolve(root: any) {
        return root.BookingCancel
      },
    })
    t.field('_count', {
      type: 'CancelReasonCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})

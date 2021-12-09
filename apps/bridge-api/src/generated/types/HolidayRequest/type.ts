import { objectType } from 'nexus'

export const HolidayRequest = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'HolidayRequest',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.int('staff_id')
    t.int('request_id')
    t.field('holiday_from', { type: 'DateTime' })
    t.field('holiday_to', { type: 'DateTime' })
    t.string('status')
    t.string('leave_type')
    t.int('approved_by')
    t.string('staff_comments')
    t.int('seen')
    t.nullable.int('rejected_by')
    t.nullable.string('approve_comments')
    t.nullable.string('reject_comments')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.field('CmStaffGeneral', {
      type: 'CmStaffGeneral',
      resolve(root: any) {
        return root.CmStaffGeneral
      },
    })
    t.list.field('RotaShift', {
      type: 'RotaShift',
      args: {
        where: 'RotaShiftWhereInput',
        orderBy: 'RotaShiftOrderByWithRelationInput',
        cursor: 'RotaShiftWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'RotaShiftScalarFieldEnum',
      },
      resolve(root: any) {
        return root.RotaShift
      },
    })
    t.field('_count', {
      type: 'HolidayRequestCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})

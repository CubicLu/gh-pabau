import { objectType } from 'nexus'

export const CmStaffGeneral = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmStaffGeneral',
  definition(t) {
    t.int('ID')
    t.nullable.string('OwnerID')
    t.int('company_id')
    t.string('Avatar')
    t.string('Fname')
    t.string('Lname')
    t.string('MI')
    t.nullable.field('Birthdate', { type: 'DateTime' })
    t.string('SSN')
    t.string('Address1')
    t.string('Address2')
    t.string('City')
    t.string('St')
    t.string('Zip')
    t.string('Country')
    t.string('HomePhone')
    t.string('WorkPhone')
    t.string('CellPhone')
    t.string('Fax')
    t.string('Email')
    t.int('Status')
    t.string('EmployeeNumber')
    t.nullable.field('HireDate', { type: 'DateTime' })
    t.nullable.field('RenewalDate', { type: 'DateTime' })
    t.nullable.int('max_vacation_days')
    t.string('Location')
    t.nullable.int('Position')
    t.int('Department')
    t.int('Manager')
    t.int('W4Status')
    t.string('Exemptions')
    t.int('Gender')
    t.int('EEOCode')
    t.int('EEOCategory')
    t.nullable.field('NextReview', { type: 'DateTime' })
    t.field('EnumStatus', { type: 'cm_staff_general_EnumStatus' })
    t.nullable.field('CreatedDate', { type: 'DateTime' })
    t.int('IpAddress')
    t.nullable.int('pabau_id')
    t.nullable.int('DefaultLocation')
    t.float('consultation_fee')
    t.string('deleted_on')
    t.string('secretary')
    t.boolean('secretary_enable')
    t.string('Salutation')
    t.int('commission_sheet_id')
    t.nullable.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.field('CompanyBranch', {
      type: 'CompanyBranch',
      resolve(root: any) {
        return root.CompanyBranch
      },
    })
    t.nullable.field('CompanyPosition', {
      type: 'CompanyPosition',
      resolve(root: any) {
        return root.CompanyPosition
      },
    })
    t.list.field('HolidayRequest', {
      type: 'HolidayRequest',
      args: {
        where: 'HolidayRequestWhereInput',
        orderBy: 'HolidayRequestOrderByWithRelationInput',
        cursor: 'HolidayRequestWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'HolidayRequestScalarFieldEnum',
      },
      resolve(root: any) {
        return root.HolidayRequest
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
    t.nullable.field('StaffNote', {
      type: 'StaffNote',
      resolve(root: any) {
        return root.StaffNote
      },
    })
    t.list.field('InventoryDiscrepancy', {
      type: 'InventoryDiscrepancy',
      args: {
        where: 'InventoryDiscrepancyWhereInput',
        orderBy: 'InventoryDiscrepancyOrderByWithRelationInput',
        cursor: 'InventoryDiscrepancyWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InventoryDiscrepancyScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InventoryDiscrepancy
      },
    })
    t.nullable.field('_count', {
      type: 'CmStaffGeneralCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})

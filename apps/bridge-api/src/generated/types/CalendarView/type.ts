import { objectType } from 'nexus'

export const CalendarView = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CalendarView',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.int('user_id')
    t.string('viewMode')
    t.string('dayViewMode')
    t.string('employeesViewMode')
    t.string('employeeGroupsViewMode')
    t.string('locationsViewMode')
    t.string('roomsViewMode')
    t.string('serviceMastersViewMode')
    t.string('serviceGroupsViewMode')
    t.string('servicesViewMode')
    t.int('appointmentSize')
    t.string('favorite_name')
    t.int('favorite_shared')
    t.int('favorite')
    t.int('favorite_id')
  },
})

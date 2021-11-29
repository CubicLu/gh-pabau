import { objectType } from 'nexus'

export const ServiceEquipment = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ServiceEquipment',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.int('service_id')
    t.int('equipment_id')
    t.int('equipment_quantity')
    t.int('priority_order')
    t.field('Equipment', {
      type: 'Equipment',
      resolve(root: any) {
        return root.Equipment
      },
    })
    t.nullable.field('Service', {
      type: 'CompanyService',
      resolve(root: any) {
        return root.Service
      },
    })
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})

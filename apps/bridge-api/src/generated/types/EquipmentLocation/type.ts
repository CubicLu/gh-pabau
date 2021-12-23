import { objectType } from 'nexus'

export const EquipmentLocation = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'EquipmentLocation',
  definition(t) {
    t.int('id')
    t.int('equipment_id')
    t.int('location_id')
    t.nullable.field('Equipment', {
      type: 'Equipment',
      resolve(root: any) {
        return root.Equipment
      },
    })
    t.nullable.field('Location', {
      type: 'CompanyBranch',
      resolve(root: any) {
        return root.Location
      },
    })
  },
})

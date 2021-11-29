import { objectType } from 'nexus'

export const Equipment = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Equipment',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('equipment_name')
    t.int('quantity')
    t.int('is_active')
    t.nullable.int('field_order')
    t.list.field('ServiceEquipment', {
      type: 'ServiceEquipment',
      args: {
        where: 'ServiceEquipmentWhereInput',
        orderBy: 'ServiceEquipmentOrderByWithRelationInput',
        cursor: 'ServiceEquipmentWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ServiceEquipmentScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ServiceEquipment
      },
    })
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.field('_count', {
      type: 'EquipmentCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})

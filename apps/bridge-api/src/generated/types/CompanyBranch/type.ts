import { objectType } from 'nexus'

export const CompanyBranch = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CompanyBranch',
  definition(t) {
    t.int('id')
    t.int('group_id')
    t.int('company_id')
    t.string('address')
    t.string('street')
    t.string('city')
    t.string('county')
    t.string('name')
    t.string('postcode')
    t.int('online_bookings')
    t.string('phone')
    t.string('website')
    t.int('is_active')
    t.int('bookable_online')
    t.int('calendar_bookable')
    t.boolean('is_default')
    t.float('lat')
    t.float('lng')
    t.string('custom_id')
    t.string('email')
    t.int('send_conf_email')
    t.int('show_online')
    t.int('loc_order')
    t.string('region')
    t.int('invoice_template_id')
    t.string('color')
    t.boolean('notify_on_lead')
    t.nullable.string('notice')
    t.nullable.string('image')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.field('CompanyBranchGroup', {
      type: 'CompanyBranchGroup',
      resolve(root: any) {
        return root.CompanyBranchGroup
      },
    })
    t.list.field('CompanyRoomLocation', {
      type: 'CompanyRoomLocation',
      args: {
        where: 'CompanyRoomLocationWhereInput',
        orderBy: 'CompanyRoomLocationOrderByWithRelationInput',
        cursor: 'CompanyRoomLocationWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyRoomLocationScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyRoomLocation
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
    t.list.field('CmStaffGeneral', {
      type: 'CmStaffGeneral',
      args: {
        where: 'CmStaffGeneralWhereInput',
        orderBy: 'CmStaffGeneralOrderByWithRelationInput',
        cursor: 'CmStaffGeneralWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmStaffGeneralScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmStaffGeneral
      },
    })
    t.list.field('CmContactLocation', {
      type: 'CmContactLocation',
      args: {
        where: 'CmContactLocationWhereInput',
        orderBy: 'CmContactLocationOrderByWithRelationInput',
        cursor: 'CmContactLocationWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactLocationScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContactLocation
      },
    })
    t.list.field('CmPurchaseOrder', {
      type: 'CmPurchaseOrder',
      args: {
        where: 'CmPurchaseOrderWhereInput',
        orderBy: 'CmPurchaseOrderOrderByWithRelationInput',
        cursor: 'CmPurchaseOrderWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmPurchaseOrderScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmPurchaseOrder
      },
    })
    t.list.field('InventoryCount', {
      type: 'InventoryCount',
      args: {
        where: 'InventoryCountWhereInput',
        orderBy: 'InventoryCountOrderByWithRelationInput',
        cursor: 'InventoryCountWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InventoryCountScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InventoryCount
      },
    })
    t.list.field('InvWarehouseProduct', {
      type: 'InvWarehouseProduct',
      args: {
        where: 'InvWarehouseProductWhereInput',
        orderBy: 'InvWarehouseProductOrderByWithRelationInput',
        cursor: 'InvWarehouseProductWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InvWarehouseProductScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InvWarehouseProduct
      },
    })
    t.list.field('ManageCustomField', {
      type: 'ManageCustomField',
      args: {
        where: 'ManageCustomFieldWhereInput',
        orderBy: 'ManageCustomFieldOrderByWithRelationInput',
        cursor: 'ManageCustomFieldWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ManageCustomFieldScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ManageCustomField
      },
    })
    t.list.field('CompanyBranchAttachment', {
      type: 'CompanyBranchAttachment',
      args: {
        where: 'CompanyBranchAttachmentWhereInput',
        orderBy: 'CompanyBranchAttachmentOrderByWithRelationInput',
        cursor: 'CompanyBranchAttachmentWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyBranchAttachmentScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyBranchAttachment
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
    t.list.field('InventoryMovement', {
      type: 'InventoryMovement',
      args: {
        where: 'InventoryMovementWhereInput',
        orderBy: 'InventoryMovementOrderByWithRelationInput',
        cursor: 'InventoryMovementWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InventoryMovementScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InventoryMovement
      },
    })
    t.list.field('InvSale', {
      type: 'InvSale',
      args: {
        where: 'InvSaleWhereInput',
        orderBy: 'InvSaleOrderByWithRelationInput',
        cursor: 'InvSaleWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InvSaleScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InvSale
      },
    })
    t.list.field('ServiceLocationTier', {
      type: 'ServiceLocationTier',
      args: {
        where: 'ServiceLocationTierWhereInput',
        orderBy: 'ServiceLocationTierOrderByWithRelationInput',
        cursor: 'ServiceLocationTierWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ServiceLocationTierScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ServiceLocationTier
      },
    })
    t.list.field('CmLead', {
      type: 'CmLead',
      args: {
        where: 'CmLeadWhereInput',
        orderBy: 'CmLeadOrderByWithRelationInput',
        cursor: 'CmLeadWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmLeadScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmLead
      },
    })
    t.field('_count', {
      type: 'CompanyBranchCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})

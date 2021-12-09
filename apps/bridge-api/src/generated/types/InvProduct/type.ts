import { objectType } from 'nexus'

export const InvProduct = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'InvProduct',
  definition(t) {
    t.int('id')
    t.nullable.string('code')
    t.string('name')
    t.nullable.string('sku')
    t.nullable.string('unit')
    t.nullable.string('size')
    t.nullable.int('product_order')
    t.string('um')
    t.nullable.float('cost')
    t.float('price')
    t.int('alert_quantity')
    t.nullable.string('show_on_website')
    t.nullable.string('image')
    t.nullable.int('category_id')
    t.nullable.int('supplier_id')
    t.nullable.string('note')
    t.nullable.int('company_id')
    t.nullable.int('uid')
    t.nullable.field('created_date', { type: 'DateTime' })
    t.nullable.field('modified_date', { type: 'DateTime' })
    t.string('Description')
    t.string('custom_id')
    t.int('category_custom_id')
    t.int('PriceListGroup_id')
    t.nullable.int('VATRate_id')
    t.nullable.int('imported')
    t.nullable.string('old_barcode')
    t.nullable.int('max_level')
    t.nullable.int('is_active')
    t.nullable.int('product_points')
    t.nullable.int('open_sale')
    t.nullable.int('new_imported')
    t.nullable.string('sage_nominal_code')
    t.nullable.field('procedure_date', { type: 'DateTime' })
    t.nullable.string('product_account_code_xero')
    t.boolean('allow_negative_qty')
    t.nullable.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.field('InvCategory', {
      type: 'InvCategory',
      resolve(root: any) {
        return root.InvCategory
      },
    })
    t.nullable.field('Supplier', {
      type: 'AccountManager',
      resolve(root: any) {
        return root.Supplier
      },
    })
    t.nullable.field('Tax', {
      type: 'Tax',
      resolve(root: any) {
        return root.Tax
      },
    })
    t.list.field('CmDrug', {
      type: 'CmDrug',
      args: {
        where: 'CmDrugWhereInput',
        orderBy: 'CmDrugOrderByWithRelationInput',
        cursor: 'CmDrugWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmDrugScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmDrug
      },
    })
    t.list.field('CmPurchaseItem', {
      type: 'CmPurchaseItem',
      args: {
        where: 'CmPurchaseItemWhereInput',
        orderBy: 'CmPurchaseItemOrderByWithRelationInput',
        cursor: 'CmPurchaseItemWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmPurchaseItemScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmPurchaseItem
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
    t.list.field('CmProductCustomField', {
      type: 'CmProductCustomField',
      args: {
        where: 'CmProductCustomFieldWhereInput',
        orderBy: 'CmProductCustomFieldOrderByWithRelationInput',
        cursor: 'CmProductCustomFieldWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmProductCustomFieldScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmProductCustomField
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
    t.list.field('Package', {
      type: 'Package',
      args: {
        where: 'PackageWhereInput',
        orderBy: 'PackageOrderByWithRelationInput',
        cursor: 'PackageWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PackageScalarFieldEnum',
      },
      resolve(root: any) {
        return root.Package
      },
    })
    t.list.field('PackageService', {
      type: 'Package',
      args: {
        where: 'PackageWhereInput',
        orderBy: 'PackageOrderByWithRelationInput',
        cursor: 'PackageWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PackageScalarFieldEnum',
      },
      resolve(root: any) {
        return root.PackageService
      },
    })
    t.list.field('SaleItem', {
      type: 'SaleItem',
      args: {
        where: 'SaleItemWhereInput',
        orderBy: 'SaleItemOrderByWithRelationInput',
        cursor: 'SaleItemWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'SaleItemScalarFieldEnum',
      },
      resolve(root: any) {
        return root.SaleItem
      },
    })
    t.list.field('CompanyService', {
      type: 'CompanyService',
      args: {
        where: 'CompanyServiceWhereInput',
        orderBy: 'CompanyServiceOrderByWithRelationInput',
        cursor: 'CompanyServiceWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyServiceScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyService
      },
    })
    t.list.field('InsuranceContractPrice', {
      type: 'InsuranceContractPrice',
      args: {
        where: 'InsuranceContractPriceWhereInput',
        orderBy: 'InsuranceContractPriceOrderByWithRelationInput',
        cursor: 'InsuranceContractPriceWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InsuranceContractPriceScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InsuranceContractPrice
      },
    })
    t.field('_count', {
      type: 'InvProductCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})

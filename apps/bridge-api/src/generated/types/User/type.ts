import { objectType } from 'nexus'

export const User = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'User',
  definition(t) {
    t.int('id')
    t.nullable.string('username')
    t.string('full_name')
    t.nullable.field('created', { type: 'DateTime' })
    t.nullable.field('last_login', { type: 'DateTime' })
    t.nullable.int('company_id')
    t.string('email')
    t.int('admin')
    t.string('address')
    t.string('timezone')
    t.string('locale')
    t.string('language')
    t.string('job_title')
    t.string('department')
    t.string('division')
    t.int('super')
    t.string('default_page')
    t.string('signature')
    t.string('image')
    t.string('position')
    t.string('location')
    t.int('deleted')
    t.string('pass_code')
    t.string('phone_number')
    t.int('hide_online_bookings')
    t.string('passcode')
    t.string('last_loaded_page')
    t.boolean('temporary_password')
    t.string('custom_id')
    t.int('hide_calendar')
    t.int('calendar_order')
    t.nullable.field('clocked_in', { type: 'DateTime' })
    t.nullable.field('clocked_out', { type: 'DateTime' })
    t.int('last_password_reset')
    t.int('force_password')
    t.boolean('limited_user')
    t.boolean('can_void')
    t.boolean('can_refund')
    t.boolean('can_report')
    t.boolean('can_rota')
    t.boolean('staff_read_only')
    t.boolean('stock_read_only')
    t.boolean('all_reports')
    t.int('performance_stats')
    t.boolean('disable_tutorial')
    t.boolean('all_services')
    t.boolean('delete_treatment')
    t.boolean('admin_tasks')
    t.int('admin_leads')
    t.int('imported')
    t.int('login_fail_count')
    t.int('can_edit_booking_time')
    t.string('user_color')
    t.int('disable_multiple_clinics')
    t.int('is_hcp')
    t.int('login_disabled')
    t.boolean('can_patient_appoint')
    t.boolean('can_patient_communicatons')
    t.boolean('can_patient_photos')
    t.boolean('can_patient_fiancials')
    t.boolean('can_patient_treatments')
    t.boolean('can_patient_docs')
    t.boolean('can_patient_packages')
    t.boolean('can_patient_prescription')
    t.boolean('can_patient_consents')
    t.boolean('can_patient_giftvoucher')
    t.boolean('can_patient_loyalty')
    t.boolean('can_patient_recall')
    t.boolean('can_patient_memberships')
    t.boolean('can_cancel_booking')
    t.boolean('notify_on_booking')
    t.boolean('can_edit_communications')
    t.boolean('can_delete_communications')
    t.boolean('can_view_full_cal')
    t.string('permission_last_role')
    t.boolean('can_merge')
    t.nullable.int('can_discount')
    t.boolean('can_discount_single')
    t.int('restored')
    t.nullable.string('google_auth_secret')
    t.int('default_contract_id')
    t.boolean('can_see_personal')
    t.boolean('appear_on_rota')
    t.boolean('can_patient_medical_history')
    t.boolean('can_lab_requests')
    t.int('detailed_view')
    t.boolean('can_make_blockout')
    t.boolean('can_delete_blockout')
    t.boolean('can_move_blockout')
    t.boolean('main_contact')
    t.list.field('UserSecurityQuestionsAnswer', {
      type: 'UserSecurityQuestionsAnswer',
      args: {
        where: 'UserSecurityQuestionsAnswerWhereInput',
        orderBy: 'UserSecurityQuestionsAnswerOrderByWithRelationInput',
        cursor: 'UserSecurityQuestionsAnswerWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'UserSecurityQuestionsAnswerScalarFieldEnum',
      },
      resolve(root: any) {
        return root.UserSecurityQuestionsAnswer
      },
    })
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.field('CompanyDetails', {
      type: 'CompanyDetails',
      resolve(root: any) {
        return root.CompanyDetails
      },
    })
    t.nullable.field('UserGroupMember', {
      type: 'UserGroupMember',
      resolve(root: any) {
        return root.UserGroupMember
      },
    })
    t.list.field('UserMainPermission', {
      type: 'UserMainPermission',
      args: {
        where: 'UserMainPermissionWhereInput',
        orderBy: 'UserMainPermissionOrderByWithRelationInput',
        cursor: 'UserMainPermissionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'UserMainPermissionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.UserMainPermission
      },
    })
    t.list.field('UserMobilePermission', {
      type: 'UserMobilePermission',
      args: {
        where: 'UserMobilePermissionWhereInput',
        orderBy: 'UserMobilePermissionOrderByWithRelationInput',
        cursor: 'UserMobilePermissionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'UserMobilePermissionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.UserMobilePermission
      },
    })
    t.list.field('UserPermission', {
      type: 'UserPermission',
      args: {
        where: 'UserPermissionWhereInput',
        orderBy: 'UserPermissionOrderByWithRelationInput',
        cursor: 'UserPermissionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'UserPermissionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.UserPermission
      },
    })
    t.list.field('UserReport', {
      type: 'UserReport',
      args: {
        where: 'UserReportWhereInput',
        orderBy: 'UserReportOrderByWithRelationInput',
        cursor: 'UserReportWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'UserReportScalarFieldEnum',
      },
      resolve(root: any) {
        return root.UserReport
      },
    })
    t.list.field('InvBiller', {
      type: 'InvBiller',
      args: {
        where: 'InvBillerWhereInput',
        orderBy: 'InvBillerOrderByWithRelationInput',
        cursor: 'InvBillerWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InvBillerScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InvBiller
      },
    })
    t.nullable.field('UserAlertType', {
      type: 'UserAlertType',
      resolve(root: any) {
        return root.UserAlertType
      },
    })
    t.list.field('UserAlertPermission', {
      type: 'UserAlertPermission',
      args: {
        where: 'UserAlertPermissionWhereInput',
        orderBy: 'UserAlertPermissionOrderByWithRelationInput',
        cursor: 'UserAlertPermissionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'UserAlertPermissionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.UserAlertPermission
      },
    })
    t.list.field('CmContactAlert', {
      type: 'CmContactAlert',
      args: {
        where: 'CmContactAlertWhereInput',
        orderBy: 'CmContactAlertOrderByWithRelationInput',
        cursor: 'CmContactAlertWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactAlertScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContactAlert
      },
    })
    t.nullable.field('CmStaffGeneral', {
      type: 'CmStaffGeneral',
      resolve(root: any) {
        return root.CmStaffGeneral
      },
    })
    t.list.field('CompanyNote', {
      type: 'CompanyNote',
      args: {
        where: 'CompanyNoteWhereInput',
        orderBy: 'CompanyNoteOrderByWithRelationInput',
        cursor: 'CompanyNoteWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyNoteScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyNote
      },
    })
    t.list.field('TrainCourseDate', {
      type: 'TrainCourseDate',
      args: {
        where: 'TrainCourseDateWhereInput',
        orderBy: 'TrainCourseDateOrderByWithRelationInput',
        cursor: 'TrainCourseDateWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'TrainCourseDateScalarFieldEnum',
      },
      resolve(root: any) {
        return root.TrainCourseDate
      },
    })
    t.list.field('SocialSurveyFeedbackResponse', {
      type: 'SocialSurveyFeedbackResponse',
      args: {
        where: 'SocialSurveyFeedbackResponseWhereInput',
        orderBy: 'SocialSurveyFeedbackResponseOrderByWithRelationInput',
        cursor: 'SocialSurveyFeedbackResponseWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'SocialSurveyFeedbackResponseScalarFieldEnum',
      },
      resolve(root: any) {
        return root.SocialSurveyFeedbackResponse
      },
    })
    t.list.field('CmContactTravel', {
      type: 'CmContactTravel',
      args: {
        where: 'CmContactTravelWhereInput',
        orderBy: 'CmContactTravelOrderByWithRelationInput',
        cursor: 'CmContactTravelWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactTravelScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContactTravel
      },
    })
    t.list.field('CmContactViewed', {
      type: 'CmContactViewed',
      args: {
        where: 'CmContactViewedWhereInput',
        orderBy: 'CmContactViewedOrderByWithRelationInput',
        cursor: 'CmContactViewedWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactViewedScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContactViewed
      },
    })
    t.list.field('CmContactNote', {
      type: 'CmContactNote',
      args: {
        where: 'CmContactNoteWhereInput',
        orderBy: 'CmContactNoteOrderByWithRelationInput',
        cursor: 'CmContactNoteWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactNoteScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContactNote
      },
    })
    t.list.field('InvProduct', {
      type: 'InvProduct',
      args: {
        where: 'InvProductWhereInput',
        orderBy: 'InvProductOrderByWithRelationInput',
        cursor: 'InvProductWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InvProductScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InvProduct
      },
    })
    t.list.field('InvPayment', {
      type: 'InvPayment',
      args: {
        where: 'InvPaymentWhereInput',
        orderBy: 'InvPaymentOrderByWithRelationInput',
        cursor: 'InvPaymentWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InvPaymentScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InvPayment
      },
    })
    t.list.field('MessageTemplate', {
      type: 'MessageTemplate',
      args: {
        where: 'MessageTemplateWhereInput',
        orderBy: 'MessageTemplateOrderByWithRelationInput',
        cursor: 'MessageTemplateWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'MessageTemplateScalarFieldEnum',
      },
      resolve(root: any) {
        return root.MessageTemplate
      },
    })
    t.list.field('UserActivityLog', {
      type: 'UserActivityLog',
      args: {
        where: 'UserActivityLogWhereInput',
        orderBy: 'UserActivityLogOrderByWithRelationInput',
        cursor: 'UserActivityLogWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'UserActivityLogScalarFieldEnum',
      },
      resolve(root: any) {
        return root.UserActivityLog
      },
    })
    t.list.field('SmsPurchase', {
      type: 'SmsPurchase',
      args: {
        where: 'SmsPurchaseWhereInput',
        orderBy: 'SmsPurchaseOrderByWithRelationInput',
        cursor: 'SmsPurchaseWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'SmsPurchaseScalarFieldEnum',
      },
      resolve(root: any) {
        return root.SmsPurchase
      },
    })
    t.list.field('Attachments', {
      type: 'ContactAttachment',
      args: {
        where: 'ContactAttachmentWhereInput',
        orderBy: 'ContactAttachmentOrderByWithRelationInput',
        cursor: 'ContactAttachmentWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ContactAttachmentScalarFieldEnum',
      },
      resolve(root: any) {
        return root.Attachments
      },
    })
    t.list.field('StaffMeta', {
      type: 'StaffMeta',
      args: {
        where: 'StaffMetaWhereInput',
        orderBy: 'StaffMetaOrderByWithRelationInput',
        cursor: 'StaffMetaWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'StaffMetaScalarFieldEnum',
      },
      resolve(root: any) {
        return root.StaffMeta
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
    t.list.field('SocialSurveyFeedback', {
      type: 'SocialSurveyFeedback',
      args: {
        where: 'SocialSurveyFeedbackWhereInput',
        orderBy: 'SocialSurveyFeedbackOrderByWithRelationInput',
        cursor: 'SocialSurveyFeedbackWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'SocialSurveyFeedbackScalarFieldEnum',
      },
      resolve(root: any) {
        return root.SocialSurveyFeedback
      },
    })
    t.list.field('InvTaxRate', {
      type: 'InvTaxRate',
      args: {
        where: 'InvTaxRateWhereInput',
        orderBy: 'InvTaxRateOrderByWithRelationInput',
        cursor: 'InvTaxRateWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InvTaxRateScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InvTaxRate
      },
    })
    t.list.field('InvCategory', {
      type: 'InvCategory',
      args: {
        where: 'InvCategoryWhereInput',
        orderBy: 'InvCategoryOrderByWithRelationInput',
        cursor: 'InvCategoryWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InvCategoryScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InvCategory
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
    t.list.field('Booking', {
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
        return root.Booking
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
    t.nullable.field('CompanyOwner', {
      type: 'Company',
      resolve(root: any) {
        return root.CompanyOwner
      },
    })
    t.list.field('PasswordResetAuth', {
      type: 'PasswordResetAuth',
      args: {
        where: 'PasswordResetAuthWhereInput',
        orderBy: 'PasswordResetAuthOrderByWithRelationInput',
        cursor: 'PasswordResetAuthWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PasswordResetAuthScalarFieldEnum',
      },
      resolve(root: any) {
        return root.PasswordResetAuth
      },
    })
    t.nullable.field('_count', {
      type: 'UserCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})

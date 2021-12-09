import { objectType } from 'nexus'

export const CmContact = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmContact',
  definition(t) {
    t.int('ID')
    t.nullable.string('Avatar')
    t.int('OwnerID')
    t.string('Salutation')
    t.string('Fname')
    t.int('company_id')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.int('location_id')
    t.string('Email')
    t.string('Phone')
    t.nullable.string('OtherPhone')
    t.string('Mobile')
    t.nullable.string('Assistant')
    t.nullable.string('ReportsTo')
    t.nullable.string('LeadSource')
    t.string('Lname')
    t.nullable.string('Title')
    t.nullable.string('Department')
    t.nullable.string('HomePhone')
    t.nullable.string('Fax')
    t.nullable.field('DOB', { type: 'DateTime' })
    t.nullable.string('AsstPhone')
    t.field('EmailOptOut', { type: 'cm_contacts_EmailOptOut' })
    t.nullable.string('SkypeId')
    t.field('AddToQuickBooks', { type: 'cm_contacts_AddToQuickBooks' })
    t.nullable.string('SecondaryEmail')
    t.nullable.string('Twitter')
    t.string('MailingStreet')
    t.nullable.string('OtherStreet')
    t.string('MailingCity')
    t.nullable.string('OtherCity')
    t.string('MailingProvince')
    t.nullable.string('OtherProvince')
    t.string('MailingPostal')
    t.nullable.string('OtherPostal')
    t.string('MailingCountry')
    t.nullable.string('OtherCountry')
    t.nullable.string('Description')
    t.field('Status', { type: 'cm_contacts_Status' })
    t.nullable.field('CreatedDate', { type: 'DateTime' })
    t.nullable.int('IpAddress')
    t.nullable.string('fbimg')
    t.nullable.int('MarketingSource')
    t.nullable.string('RefferalSource')
    t.nullable.int('LeadID')
    t.nullable.string('group_tag')
    t.nullable.string('polite_notice')
    t.string('custom_id')
    t.nullable.string('gender')
    t.nullable.int('MarketingOptInAll')
    t.nullable.int('MarketingOptInEmail')
    t.nullable.int('MarketingOptInPhone')
    t.nullable.int('MarketingOptInPost')
    t.nullable.int('MarketingOptInText')
    t.nullable.string('notes_drop')
    t.nullable.int('imported')
    t.nullable.string('alerts_drop')
    t.nullable.int('MarketingSourceRelated')
    t.nullable.string('customer_reference')
    t.int('MarketingOptInNewsletter')
    t.nullable.string('custom_marketing_source')
    t.nullable.int('insurer_id')
    t.int('is_active')
    t.nullable.string('xero_contact_id')
    t.int('is_ambassador')
    t.nullable.field('UpdatedDate', { type: 'DateTime' })
    t.nullable.field('xero_updated_date', { type: 'DateTime' })
    t.nullable.int('discount_type')
    t.nullable.int('custom_clinic_id')
    t.nullable.int('ambassador_id')
    t.nullable.int('contract_id')
    t.nullable.string('privacy_policy')
    t.nullable.boolean('need_to_knows')
    t.int('contact_type')
    t.nullable.field('SocialSurveyFeedback', {
      type: 'SocialSurveyFeedback',
      resolve(root: any) {
        return root.SocialSurveyFeedback
      },
    })
    t.list.field('ContactAlert', {
      type: 'ContactAlert',
      args: {
        where: 'ContactAlertWhereInput',
        orderBy: 'ContactAlertOrderByWithRelationInput',
        cursor: 'ContactAlertWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ContactAlertScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ContactAlert
      },
    })
    t.list.field('AccountBalance', {
      type: 'AccountBalance',
      args: {
        where: 'AccountBalanceWhereInput',
        orderBy: 'AccountBalanceOrderByWithRelationInput',
        cursor: 'AccountBalanceWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'AccountBalanceScalarFieldEnum',
      },
      resolve(root: any) {
        return root.AccountBalance
      },
    })
    t.list.field('AccountBalanceLog', {
      type: 'AccountBalanceLog',
      args: {
        where: 'AccountBalanceLogWhereInput',
        orderBy: 'AccountBalanceLogOrderByWithRelationInput',
        cursor: 'AccountBalanceLogWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'AccountBalanceLogScalarFieldEnum',
      },
      resolve(root: any) {
        return root.AccountBalanceLog
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
    t.list.field('ContactMedicalCondition', {
      type: 'ContactMedicalCondition',
      args: {
        where: 'ContactMedicalConditionWhereInput',
        orderBy: 'ContactMedicalConditionOrderByWithRelationInput',
        cursor: 'ContactMedicalConditionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ContactMedicalConditionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ContactMedicalCondition
      },
    })
    t.list.field('ContactNote', {
      type: 'ContactNote',
      args: {
        where: 'ContactNoteWhereInput',
        orderBy: 'ContactNoteOrderByWithRelationInput',
        cursor: 'ContactNoteWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ContactNoteScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ContactNote
      },
    })
    t.list.field('CmExtraGym', {
      type: 'CmExtraGym',
      args: {
        where: 'CmExtraGymWhereInput',
        orderBy: 'CmExtraGymOrderByWithRelationInput',
        cursor: 'CmExtraGymWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmExtraGymScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmExtraGym
      },
    })
    t.list.field('CmExtraPatient', {
      type: 'CmExtraPatient',
      args: {
        where: 'CmExtraPatientWhereInput',
        orderBy: 'CmExtraPatientOrderByWithRelationInput',
        cursor: 'CmExtraPatientWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmExtraPatientScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmExtraPatient
      },
    })
    t.list.field('CmExtraSalon', {
      type: 'CmExtraSalon',
      args: {
        where: 'CmExtraSalonWhereInput',
        orderBy: 'CmExtraSalonOrderByWithRelationInput',
        cursor: 'CmExtraSalonWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmExtraSalonScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmExtraSalon
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
    t.list.field('LoyaltyLog', {
      type: 'LoyaltyLog',
      args: {
        where: 'LoyaltyLogWhereInput',
        orderBy: 'LoyaltyLogOrderByWithRelationInput',
        cursor: 'LoyaltyLogWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'LoyaltyLogScalarFieldEnum',
      },
      resolve(root: any) {
        return root.LoyaltyLog
      },
    })
    t.nullable.field('LoyaltyPoints', {
      type: 'LoyaltyPoints',
      resolve(root: any) {
        return root.LoyaltyPoints
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
    t.list.field('Packages', {
      type: 'ContactPackage',
      args: {
        where: 'ContactPackageWhereInput',
        orderBy: 'ContactPackageOrderByWithRelationInput',
        cursor: 'ContactPackageWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ContactPackageScalarFieldEnum',
      },
      resolve(root: any) {
        return root.Packages
      },
    })
    t.nullable.field('Insurance', {
      type: 'InsuranceDetail',
      resolve(root: any) {
        return root.Insurance
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
    t.list.field('InsuranceCompany', {
      type: 'ContactInsurance',
      args: {
        where: 'ContactInsuranceWhereInput',
        orderBy: 'ContactInsuranceOrderByWithRelationInput',
        cursor: 'ContactInsuranceWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ContactInsuranceScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InsuranceCompany
      },
    })
    t.list.field('ContactMeta', {
      type: 'ContactMeta',
      args: {
        where: 'ContactMetaWhereInput',
        orderBy: 'ContactMetaOrderByWithRelationInput',
        cursor: 'ContactMetaWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ContactMetaScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ContactMeta
      },
    })
    t.list.field('CommunicationRecipient', {
      type: 'CommunicationRecipient',
      args: {
        where: 'CommunicationRecipientWhereInput',
        orderBy: 'CommunicationRecipientOrderByWithRelationInput',
        cursor: 'CommunicationRecipientWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CommunicationRecipientScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CommunicationRecipient
      },
    })
    t.list.field('CmContactCustom', {
      type: 'CmContactCustom',
      args: {
        where: 'CmContactCustomWhereInput',
        orderBy: 'CmContactCustomOrderByWithRelationInput',
        cursor: 'CmContactCustomWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactCustomScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContactCustom
      },
    })
    t.list.field('CmContactLabel', {
      type: 'CmContactLabel',
      args: {
        where: 'CmContactLabelWhereInput',
        orderBy: 'CmContactLabelOrderByWithRelationInput',
        cursor: 'CmContactLabelWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactLabelScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContactLabel
      },
    })
    t.list.field('Activity', {
      type: 'Activity',
      args: {
        where: 'ActivityWhereInput',
        orderBy: 'ActivityOrderByWithRelationInput',
        cursor: 'ActivityWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ActivityScalarFieldEnum',
      },
      resolve(root: any) {
        return root.Activity
      },
    })
    t.list.field('Albums', {
      type: 'PhotoAlbum',
      args: {
        where: 'PhotoAlbumWhereInput',
        orderBy: 'PhotoAlbumOrderByWithRelationInput',
        cursor: 'PhotoAlbumWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PhotoAlbumScalarFieldEnum',
      },
      resolve(root: any) {
        return root.Albums
      },
    })
    t.nullable.field('ContactPreference', {
      type: 'ContactPreference',
      resolve(root: any) {
        return root.ContactPreference
      },
    })
    t.nullable.field('MarketingSourceData', {
      type: 'MarketingSource',
      resolve(root: any) {
        return root.MarketingSourceData
      },
    })
    t.nullable.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
    t.list.field('Voucher', {
      type: 'Voucher',
      args: {
        where: 'VoucherWhereInput',
        orderBy: 'VoucherOrderByWithRelationInput',
        cursor: 'VoucherWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'VoucherScalarFieldEnum',
      },
      resolve(root: any) {
        return root.Voucher
      },
    })
    t.list.field('PurchasedVoucher', {
      type: 'Voucher',
      args: {
        where: 'VoucherWhereInput',
        orderBy: 'VoucherOrderByWithRelationInput',
        cursor: 'VoucherWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'VoucherScalarFieldEnum',
      },
      resolve(root: any) {
        return root.PurchasedVoucher
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
    t.list.field('PathwaysTaken', {
      type: 'PathwaysTaken',
      args: {
        where: 'PathwaysTakenWhereInput',
        orderBy: 'PathwaysTakenOrderByWithRelationInput',
        cursor: 'PathwaysTakenWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PathwaysTakenScalarFieldEnum',
      },
      resolve(root: any) {
        return root.PathwaysTaken
      },
    })
    t.list.field('PathwayStepsTaken', {
      type: 'PathwayStepsTaken',
      args: {
        where: 'PathwayStepsTakenWhereInput',
        orderBy: 'PathwayStepsTakenOrderByWithRelationInput',
        cursor: 'PathwayStepsTakenWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PathwayStepsTakenScalarFieldEnum',
      },
      resolve(root: any) {
        return root.PathwayStepsTaken
      },
    })
    t.list.field('CommunicationAttachment', {
      type: 'CommunicationAttachment',
      args: {
        where: 'CommunicationAttachmentWhereInput',
        orderBy: 'CommunicationAttachmentOrderByWithRelationInput',
        cursor: 'CommunicationAttachmentWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CommunicationAttachmentScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CommunicationAttachment
      },
    })
    t.list.field('RecallSchedule', {
      type: 'RecallSchedule',
      args: {
        where: 'RecallScheduleWhereInput',
        orderBy: 'RecallScheduleOrderByWithRelationInput',
        cursor: 'RecallScheduleWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'RecallScheduleScalarFieldEnum',
      },
      resolve(root: any) {
        return root.RecallSchedule
      },
    })
    t.list.field('LabRequest', {
      type: 'LabRequest',
      args: {
        where: 'LabRequestWhereInput',
        orderBy: 'LabRequestOrderByWithRelationInput',
        cursor: 'LabRequestWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'LabRequestScalarFieldEnum',
      },
      resolve(root: any) {
        return root.LabRequest
      },
    })
    t.list.field('MedicalFormContact', {
      type: 'MedicalFormContact',
      args: {
        where: 'MedicalFormContactWhereInput',
        orderBy: 'MedicalFormContactOrderByWithRelationInput',
        cursor: 'MedicalFormContactWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'MedicalFormContactScalarFieldEnum',
      },
      resolve(root: any) {
        return root.MedicalFormContact
      },
    })
    t.list.field('CommunicationsRequestedForms', {
      type: 'CommunicationsRequestedForms',
      args: {
        where: 'CommunicationsRequestedFormsWhereInput',
        orderBy: 'CommunicationsRequestedFormsOrderByWithRelationInput',
        cursor: 'CommunicationsRequestedFormsWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CommunicationsRequestedFormsScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CommunicationsRequestedForms
      },
    })
    t.field('_count', {
      type: 'CmContactCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})

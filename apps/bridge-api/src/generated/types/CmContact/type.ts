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
    t.list.field('CmContactAlert', {
      type: 'CmContactAlert',
      args: {
        where: 'CmContactAlertWhereInput',
        orderBy: 'CmContactAlertOrderByInput',
        cursor: 'CmContactAlertWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactAlertScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContactAlert
      },
    })
    t.list.field('AccountBalance', {
      type: 'AccountBalance',
      args: {
        where: 'AccountBalanceWhereInput',
        orderBy: 'AccountBalanceOrderByInput',
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
        orderBy: 'AccountBalanceLogOrderByInput',
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
        orderBy: 'CmContactLocationOrderByInput',
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
        orderBy: 'CmContactTravelOrderByInput',
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
        orderBy: 'CmContactViewedOrderByInput',
        cursor: 'CmContactViewedWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactViewedScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContactViewed
      },
    })
    t.list.field('CmContactMedicalCondition', {
      type: 'CmContactMedicalCondition',
      args: {
        where: 'CmContactMedicalConditionWhereInput',
        orderBy: 'CmContactMedicalConditionOrderByInput',
        cursor: 'CmContactMedicalConditionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactMedicalConditionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContactMedicalCondition
      },
    })
    t.list.field('CmContactNote', {
      type: 'CmContactNote',
      args: {
        where: 'CmContactNoteWhereInput',
        orderBy: 'CmContactNoteOrderByInput',
        cursor: 'CmContactNoteWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactNoteScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContactNote
      },
    })
    t.list.field('MedicalFormContact', {
      type: 'MedicalFormContact',
      args: {
        where: 'MedicalFormContactWhereInput',
        orderBy: 'MedicalFormContactOrderByInput',
        cursor: 'MedicalFormContactWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'MedicalFormContactScalarFieldEnum',
      },
      resolve(root: any) {
        return root.MedicalFormContact
      },
    })
    t.list.field('CmExtraGym', {
      type: 'CmExtraGym',
      args: {
        where: 'CmExtraGymWhereInput',
        orderBy: 'CmExtraGymOrderByInput',
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
        orderBy: 'CmExtraPatientOrderByInput',
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
        orderBy: 'CmExtraSalonOrderByInput',
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
        orderBy: 'InvPaymentOrderByInput',
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
        orderBy: 'LoyaltyLogOrderByInput',
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
        orderBy: 'ContactAttachmentOrderByInput',
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
        orderBy: 'ContactPackageOrderByInput',
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
        orderBy: 'BookingOrderByInput',
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
        orderBy: 'InvSaleOrderByInput',
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
        orderBy: 'InventoryMovementOrderByInput',
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
        orderBy: 'ContactInsuranceOrderByInput',
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
        orderBy: 'ContactMetaOrderByInput',
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
        orderBy: 'CommunicationRecipientOrderByInput',
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
        orderBy: 'CmContactCustomOrderByInput',
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
        orderBy: 'CmContactLabelOrderByInput',
        cursor: 'CmContactLabelWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactLabelScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContactLabel
      },
    })
    t.nullable.field('_count', {
      type: 'CmContactCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})

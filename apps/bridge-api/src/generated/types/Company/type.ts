import { objectType } from 'nexus'

export const Company = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Company',
  definition(t) {
    t.int('id')
    t.string('user')
    t.int('digit8')
    t.int('admin')
    t.field('creation_date', { type: 'DateTime' })
    t.string('image')
    t.nullable.string('slug')
    t.nullable.string('remote_url')
    t.nullable.string('remote_connect')
    t.nullable.boolean('cron_enabled')
    t.nullable.field('details', {
      type: 'CompanyDetails',
      resolve(root: any) {
        return root.details
      },
    })
    t.nullable.field('subscription', {
      type: 'CompanySubscription',
      resolve(root: any) {
        return root.subscription
      },
    })
    t.nullable.field('owner', {
      type: 'User',
      resolve(root: any) {
        return root.owner
      },
    })
    t.list.field('TwoFactorHistory', {
      type: 'TwoFactorHistory',
      args: {
        where: 'TwoFactorHistoryWhereInput',
        orderBy: 'TwoFactorHistoryOrderByWithRelationInput',
        cursor: 'TwoFactorHistoryWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'TwoFactorHistoryScalarFieldEnum',
      },
      resolve(root: any) {
        return root.TwoFactorHistory
      },
    })
    t.list.field('ThirdPartyAccess', {
      type: 'ThirdPartyAccess',
      args: {
        where: 'ThirdPartyAccessWhereInput',
        orderBy: 'ThirdPartyAccessOrderByWithRelationInput',
        cursor: 'ThirdPartyAccessWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ThirdPartyAccessScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ThirdPartyAccess
      },
    })
    t.list.field('AcceptEmailToken', {
      type: 'AcceptEmailToken',
      args: {
        where: 'AcceptEmailTokenWhereInput',
        orderBy: 'AcceptEmailTokenOrderByWithRelationInput',
        cursor: 'AcceptEmailTokenWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'AcceptEmailTokenScalarFieldEnum',
      },
      resolve(root: any) {
        return root.AcceptEmailToken
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
    t.list.field('MarketingSource', {
      type: 'MarketingSource',
      args: {
        where: 'MarketingSourceWhereInput',
        orderBy: 'MarketingSourceOrderByWithRelationInput',
        cursor: 'MarketingSourceWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'MarketingSourceScalarFieldEnum',
      },
      resolve(root: any) {
        return root.MarketingSource
      },
    })
    t.list.field('CmCase', {
      type: 'CmCase',
      args: {
        where: 'CmCaseWhereInput',
        orderBy: 'CmCaseOrderByWithRelationInput',
        cursor: 'CmCaseWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmCaseScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmCase
      },
    })
    t.list.field('CmCaseReply', {
      type: 'CmCaseReply',
      args: {
        where: 'CmCaseReplyWhereInput',
        orderBy: 'CmCaseReplyOrderByWithRelationInput',
        cursor: 'CmCaseReplyWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmCaseReplyScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmCaseReply
      },
    })
    t.list.field('CmCampaign', {
      type: 'CmCampaign',
      args: {
        where: 'CmCampaignWhereInput',
        orderBy: 'CmCampaignOrderByWithRelationInput',
        cursor: 'CmCampaignWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmCampaignScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmCampaign
      },
    })
    t.list.field('User', {
      type: 'User',
      args: {
        where: 'UserWhereInput',
        orderBy: 'UserOrderByWithRelationInput',
        cursor: 'UserWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'UserScalarFieldEnum',
      },
      resolve(root: any) {
        return root.User
      },
    })
    t.list.field('Candidate', {
      type: 'Candidate',
      args: {
        where: 'CandidateWhereInput',
        orderBy: 'CandidateOrderByWithRelationInput',
        cursor: 'CandidateWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CandidateScalarFieldEnum',
      },
      resolve(root: any) {
        return root.Candidate
      },
    })
    t.list.field('BookingStatus', {
      type: 'BookingStatus',
      args: {
        where: 'BookingStatusWhereInput',
        orderBy: 'BookingStatusOrderByWithRelationInput',
        cursor: 'BookingStatusWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'BookingStatusScalarFieldEnum',
      },
      resolve(root: any) {
        return root.BookingStatus
      },
    })
    t.list.field('UserSalutation', {
      type: 'UserSalutation',
      args: {
        where: 'UserSalutationWhereInput',
        orderBy: 'UserSalutationOrderByWithRelationInput',
        cursor: 'UserSalutationWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'UserSalutationScalarFieldEnum',
      },
      resolve(root: any) {
        return root.UserSalutation
      },
    })
    t.list.field('CompanyBranch', {
      type: 'CompanyBranch',
      args: {
        where: 'CompanyBranchWhereInput',
        orderBy: 'CompanyBranchOrderByWithRelationInput',
        cursor: 'CompanyBranchWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyBranchScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyBranch
      },
    })
    t.list.field('CompanyLocation', {
      type: 'CompanyLocation',
      args: {
        where: 'CompanyLocationWhereInput',
        orderBy: 'CompanyLocationOrderByWithRelationInput',
        cursor: 'CompanyLocationWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyLocationScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyLocation
      },
    })
    t.list.field('CompanyRoom', {
      type: 'CompanyRoom',
      args: {
        where: 'CompanyRoomWhereInput',
        orderBy: 'CompanyRoomOrderByWithRelationInput',
        cursor: 'CompanyRoomWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyRoomScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyRoom
      },
    })
    t.list.field('CompanyRoomService', {
      type: 'CompanyRoomService',
      args: {
        where: 'CompanyRoomServiceWhereInput',
        orderBy: 'CompanyRoomServiceOrderByWithRelationInput',
        cursor: 'CompanyRoomServiceWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyRoomServiceScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyRoomService
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
    t.list.field('CompanyDepartment', {
      type: 'CompanyDepartment',
      args: {
        where: 'CompanyDepartmentWhereInput',
        orderBy: 'CompanyDepartmentOrderByWithRelationInput',
        cursor: 'CompanyDepartmentWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyDepartmentScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyDepartment
      },
    })
    t.list.field('Job', {
      type: 'Job',
      args: {
        where: 'JobWhereInput',
        orderBy: 'JobOrderByWithRelationInput',
        cursor: 'JobWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'JobScalarFieldEnum',
      },
      resolve(root: any) {
        return root.Job
      },
    })
    t.list.field('JobConfiguration', {
      type: 'JobConfiguration',
      args: {
        where: 'JobConfigurationWhereInput',
        orderBy: 'JobConfigurationOrderByWithRelationInput',
        cursor: 'JobConfigurationWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'JobConfigurationScalarFieldEnum',
      },
      resolve(root: any) {
        return root.JobConfiguration
      },
    })
    t.list.field('JobOpening', {
      type: 'JobOpening',
      args: {
        where: 'JobOpeningWhereInput',
        orderBy: 'JobOpeningOrderByWithRelationInput',
        cursor: 'JobOpeningWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'JobOpeningScalarFieldEnum',
      },
      resolve(root: any) {
        return root.JobOpening
      },
    })
    t.list.field('JobStatus', {
      type: 'JobStatus',
      args: {
        where: 'JobStatusWhereInput',
        orderBy: 'JobStatusOrderByWithRelationInput',
        cursor: 'JobStatusWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'JobStatusScalarFieldEnum',
      },
      resolve(root: any) {
        return root.JobStatus
      },
    })
    t.list.field('PointOfSaleSetting', {
      type: 'PointOfSaleSetting',
      args: {
        where: 'PointOfSaleSettingWhereInput',
        orderBy: 'PointOfSaleSettingOrderByWithRelationInput',
        cursor: 'PointOfSaleSettingWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PointOfSaleSettingScalarFieldEnum',
      },
      resolve(root: any) {
        return root.PointOfSaleSetting
      },
    })
    t.list.field('BookingSetting', {
      type: 'BookingSetting',
      args: {
        where: 'BookingSettingWhereInput',
        orderBy: 'BookingSettingOrderByWithRelationInput',
        cursor: 'BookingSettingWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'BookingSettingScalarFieldEnum',
      },
      resolve(root: any) {
        return root.BookingSetting
      },
    })
    t.list.field('AccountManager', {
      type: 'AccountManager',
      args: {
        where: 'AccountManagerWhereInput',
        orderBy: 'AccountManagerOrderByWithRelationInput',
        cursor: 'AccountManagerWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'AccountManagerScalarFieldEnum',
      },
      resolve(root: any) {
        return root.AccountManager
      },
    })
    t.list.field('AcLog', {
      type: 'AcLog',
      args: {
        where: 'AcLogWhereInput',
        orderBy: 'AcLogOrderByWithRelationInput',
        cursor: 'AcLogWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'AcLogScalarFieldEnum',
      },
      resolve(root: any) {
        return root.AcLog
      },
    })
    t.list.field('AppSubscriptionsCompanyPrice', {
      type: 'AppSubscriptionsCompanyPrice',
      args: {
        where: 'AppSubscriptionsCompanyPriceWhereInput',
        orderBy: 'AppSubscriptionsCompanyPriceOrderByWithRelationInput',
        cursor: 'AppSubscriptionsCompanyPriceWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'AppSubscriptionsCompanyPriceScalarFieldEnum',
      },
      resolve(root: any) {
        return root.AppSubscriptionsCompanyPrice
      },
    })
    t.list.field('AvilableDatesLog', {
      type: 'AvilableDatesLog',
      args: {
        where: 'AvilableDatesLogWhereInput',
        orderBy: 'AvilableDatesLogOrderByWithRelationInput',
        cursor: 'AvilableDatesLogWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'AvilableDatesLogScalarFieldEnum',
      },
      resolve(root: any) {
        return root.AvilableDatesLog
      },
    })
    t.list.field('BlockReason', {
      type: 'BlockReason',
      args: {
        where: 'BlockReasonWhereInput',
        orderBy: 'BlockReasonOrderByWithRelationInput',
        cursor: 'BlockReasonWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'BlockReasonScalarFieldEnum',
      },
      resolve(root: any) {
        return root.BlockReason
      },
    })
    t.list.field('BodyChartTemplate', {
      type: 'BodyChartTemplate',
      args: {
        where: 'BodyChartTemplateWhereInput',
        orderBy: 'BodyChartTemplateOrderByWithRelationInput',
        cursor: 'BodyChartTemplateWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'BodyChartTemplateScalarFieldEnum',
      },
      resolve(root: any) {
        return root.BodyChartTemplate
      },
    })
    t.list.field('BookitProSlider', {
      type: 'BookitProSlider',
      args: {
        where: 'BookitProSliderWhereInput',
        orderBy: 'BookitProSliderOrderByWithRelationInput',
        cursor: 'BookitProSliderWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'BookitProSliderScalarFieldEnum',
      },
      resolve(root: any) {
        return root.BookitProSlider
      },
    })
    t.list.field('CalendarView', {
      type: 'CalendarView',
      args: {
        where: 'CalendarViewWhereInput',
        orderBy: 'CalendarViewOrderByWithRelationInput',
        cursor: 'CalendarViewWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CalendarViewScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CalendarView
      },
    })
    t.list.field('CampaignAttachment', {
      type: 'CampaignAttachment',
      args: {
        where: 'CampaignAttachmentWhereInput',
        orderBy: 'CampaignAttachmentOrderByWithRelationInput',
        cursor: 'CampaignAttachmentWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CampaignAttachmentScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CampaignAttachment
      },
    })
    t.list.field('CancellationPolicy', {
      type: 'CancellationPolicy',
      args: {
        where: 'CancellationPolicyWhereInput',
        orderBy: 'CancellationPolicyOrderByWithRelationInput',
        cursor: 'CancellationPolicyWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CancellationPolicyScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CancellationPolicy
      },
    })
    t.list.field('CancelReason', {
      type: 'CancelReason',
      args: {
        where: 'CancelReasonWhereInput',
        orderBy: 'CancelReasonOrderByWithRelationInput',
        cursor: 'CancelReasonWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CancelReasonScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CancelReason
      },
    })
    t.list.field('ClassCategory', {
      type: 'ClassCategory',
      args: {
        where: 'ClassCategoryWhereInput',
        orderBy: 'ClassCategoryOrderByWithRelationInput',
        cursor: 'ClassCategoryWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ClassCategoryScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ClassCategory
      },
    })
    t.list.field('ClassProduct', {
      type: 'ClassProduct',
      args: {
        where: 'ClassProductWhereInput',
        orderBy: 'ClassProductOrderByWithRelationInput',
        cursor: 'ClassProductWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ClassProductScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ClassProduct
      },
    })
    t.list.field('ClockinLongpoll', {
      type: 'ClockinLongpoll',
      args: {
        where: 'ClockinLongpollWhereInput',
        orderBy: 'ClockinLongpollOrderByWithRelationInput',
        cursor: 'ClockinLongpollWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ClockinLongpollScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ClockinLongpoll
      },
    })
    t.list.field('CmAppointmentsCustomImportHelper', {
      type: 'CmAppointmentsCustomImportHelper',
      args: {
        where: 'CmAppointmentsCustomImportHelperWhereInput',
        orderBy: 'CmAppointmentsCustomImportHelperOrderByWithRelationInput',
        cursor: 'CmAppointmentsCustomImportHelperWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmAppointmentsCustomImportHelperScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmAppointmentsCustomImportHelper
      },
    })
    t.list.field('CmAppointmentCustom', {
      type: 'CmAppointmentCustom',
      args: {
        where: 'CmAppointmentCustomWhereInput',
        orderBy: 'CmAppointmentCustomOrderByWithRelationInput',
        cursor: 'CmAppointmentCustomWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmAppointmentCustomScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmAppointmentCustom
      },
    })
    t.list.field('CmContact', {
      type: 'CmContact',
      args: {
        where: 'CmContactWhereInput',
        orderBy: 'CmContactOrderByWithRelationInput',
        cursor: 'CmContactWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContact
      },
    })
    t.list.field('CompanyMeta', {
      type: 'CompanyMeta',
      args: {
        where: 'CompanyMetaWhereInput',
        orderBy: 'CompanyMetaOrderByWithRelationInput',
        cursor: 'CompanyMetaWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyMetaScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyMeta
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
    t.list.field('PermissionTemplate', {
      type: 'PermissionTemplate',
      args: {
        where: 'PermissionTemplateWhereInput',
        orderBy: 'PermissionTemplateOrderByWithRelationInput',
        cursor: 'PermissionTemplateWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PermissionTemplateScalarFieldEnum',
      },
      resolve(root: any) {
        return root.PermissionTemplate
      },
    })
    t.list.field('UserGroup', {
      type: 'UserGroup',
      args: {
        where: 'UserGroupWhereInput',
        orderBy: 'UserGroupOrderByWithRelationInput',
        cursor: 'UserGroupWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'UserGroupScalarFieldEnum',
      },
      resolve(root: any) {
        return root.UserGroup
      },
    })
    t.list.field('UserMaster', {
      type: 'UserMaster',
      args: {
        where: 'UserMasterWhereInput',
        orderBy: 'UserMasterOrderByWithRelationInput',
        cursor: 'UserMasterWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'UserMasterScalarFieldEnum',
      },
      resolve(root: any) {
        return root.UserMaster
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
    t.list.field('GroupPermission', {
      type: 'GroupPermission',
      args: {
        where: 'GroupPermissionWhereInput',
        orderBy: 'GroupPermissionOrderByWithRelationInput',
        cursor: 'GroupPermissionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'GroupPermissionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.GroupPermission
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
    t.list.field('SocialSurvey', {
      type: 'SocialSurvey',
      args: {
        where: 'SocialSurveyWhereInput',
        orderBy: 'SocialSurveyOrderByWithRelationInput',
        cursor: 'SocialSurveyWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'SocialSurveyScalarFieldEnum',
      },
      resolve(root: any) {
        return root.SocialSurvey
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
    t.list.field('SocialSurveyQuestion', {
      type: 'SocialSurveyQuestion',
      args: {
        where: 'SocialSurveyQuestionWhereInput',
        orderBy: 'SocialSurveyQuestionOrderByWithRelationInput',
        cursor: 'SocialSurveyQuestionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'SocialSurveyQuestionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.SocialSurveyQuestion
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
    t.list.field('HealthcodeInsurer', {
      type: 'HealthcodeInsurer',
      args: {
        where: 'HealthcodeInsurerWhereInput',
        orderBy: 'HealthcodeInsurerOrderByWithRelationInput',
        cursor: 'HealthcodeInsurerWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'HealthcodeInsurerScalarFieldEnum',
      },
      resolve(root: any) {
        return root.HealthcodeInsurer
      },
    })
    t.list.field('InsuranceDetail', {
      type: 'InsuranceDetail',
      args: {
        where: 'InsuranceDetailWhereInput',
        orderBy: 'InsuranceDetailOrderByWithRelationInput',
        cursor: 'InsuranceDetailWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InsuranceDetailScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InsuranceDetail
      },
    })
    t.list.field('CompanyPosition', {
      type: 'CompanyPosition',
      args: {
        where: 'CompanyPositionWhereInput',
        orderBy: 'CompanyPositionOrderByWithRelationInput',
        cursor: 'CompanyPositionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyPositionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyPosition
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
    t.list.field('XeroIntegration', {
      type: 'XeroIntegration',
      args: {
        where: 'XeroIntegrationWhereInput',
        orderBy: 'XeroIntegrationOrderByWithRelationInput',
        cursor: 'XeroIntegrationWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'XeroIntegrationScalarFieldEnum',
      },
      resolve(root: any) {
        return root.XeroIntegration
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
    t.list.field('CmContactJson', {
      type: 'CmContactJson',
      args: {
        where: 'CmContactJsonWhereInput',
        orderBy: 'CmContactJsonOrderByWithRelationInput',
        cursor: 'CmContactJsonWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactJsonScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContactJson
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
    t.list.field('CmContactMedicalCondition', {
      type: 'CmContactMedicalCondition',
      args: {
        where: 'CmContactMedicalConditionWhereInput',
        orderBy: 'CmContactMedicalConditionOrderByWithRelationInput',
        cursor: 'CmContactMedicalConditionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactMedicalConditionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContactMedicalCondition
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
    t.list.field('CompanyPermission', {
      type: 'CompanyPermission',
      args: {
        where: 'CompanyPermissionWhereInput',
        orderBy: 'CompanyPermissionOrderByWithRelationInput',
        cursor: 'CompanyPermissionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyPermissionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyPermission
      },
    })
    t.list.field('CompanyPolicy', {
      type: 'CompanyPolicy',
      args: {
        where: 'CompanyPolicyWhereInput',
        orderBy: 'CompanyPolicyOrderByWithRelationInput',
        cursor: 'CompanyPolicyWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyPolicyScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyPolicy
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
    t.list.field('BookitProGeneral', {
      type: 'BookitProGeneral',
      args: {
        where: 'BookitProGeneralWhereInput',
        orderBy: 'BookitProGeneralOrderByWithRelationInput',
        cursor: 'BookitProGeneralWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'BookitProGeneralScalarFieldEnum',
      },
      resolve(root: any) {
        return root.BookitProGeneral
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
    t.list.field('TemplateFolder', {
      type: 'TemplateFolder',
      args: {
        where: 'TemplateFolderWhereInput',
        orderBy: 'TemplateFolderOrderByWithRelationInput',
        cursor: 'TemplateFolderWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'TemplateFolderScalarFieldEnum',
      },
      resolve(root: any) {
        return root.TemplateFolder
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
    t.list.field('InvPaymentType', {
      type: 'InvPaymentType',
      args: {
        where: 'InvPaymentTypeWhereInput',
        orderBy: 'InvPaymentTypeOrderByWithRelationInput',
        cursor: 'InvPaymentTypeWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InvPaymentTypeScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InvPaymentType
      },
    })
    t.list.field('ServicesMasterCategory', {
      type: 'ServicesMasterCategory',
      args: {
        where: 'ServicesMasterCategoryWhereInput',
        orderBy: 'ServicesMasterCategoryOrderByWithRelationInput',
        cursor: 'ServicesMasterCategoryWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ServicesMasterCategoryScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ServicesMasterCategory
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
    t.list.field('FavoriteReport', {
      type: 'FavoriteReport',
      args: {
        where: 'FavoriteReportWhereInput',
        orderBy: 'FavoriteReportOrderByWithRelationInput',
        cursor: 'FavoriteReportWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'FavoriteReportScalarFieldEnum',
      },
      resolve(root: any) {
        return root.FavoriteReport
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
    t.list.field('Tax', {
      type: 'Tax',
      args: {
        where: 'TaxWhereInput',
        orderBy: 'TaxOrderByWithRelationInput',
        cursor: 'TaxWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'TaxScalarFieldEnum',
      },
      resolve(root: any) {
        return root.Tax
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
    t.list.field('ManageCustomFieldCategory', {
      type: 'ManageCustomFieldCategory',
      args: {
        where: 'ManageCustomFieldCategoryWhereInput',
        orderBy: 'ManageCustomFieldCategoryOrderByWithRelationInput',
        cursor: 'ManageCustomFieldCategoryWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ManageCustomFieldCategoryScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ManageCustomFieldCategory
      },
    })
    t.list.field('ManageCustomFieldItem', {
      type: 'ManageCustomFieldItem',
      args: {
        where: 'ManageCustomFieldItemWhereInput',
        orderBy: 'ManageCustomFieldItemOrderByWithRelationInput',
        cursor: 'ManageCustomFieldItemWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ManageCustomFieldItemScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ManageCustomFieldItem
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
    t.list.field('CompanyBranchGroup', {
      type: 'CompanyBranchGroup',
      args: {
        where: 'CompanyBranchGroupWhereInput',
        orderBy: 'CompanyBranchGroupOrderByWithRelationInput',
        cursor: 'CompanyBranchGroupWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyBranchGroupScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyBranchGroup
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
    t.list.field('SupplierCategory', {
      type: 'SupplierCategory',
      args: {
        where: 'SupplierCategoryWhereInput',
        orderBy: 'SupplierCategoryOrderByWithRelationInput',
        cursor: 'SupplierCategoryWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'SupplierCategoryScalarFieldEnum',
      },
      resolve(root: any) {
        return root.SupplierCategory
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
    t.list.field('InvWarehouse', {
      type: 'InvWarehouse',
      args: {
        where: 'InvWarehouseWhereInput',
        orderBy: 'InvWarehouseOrderByWithRelationInput',
        cursor: 'InvWarehouseWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InvWarehouseScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InvWarehouse
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
    t.list.field('IssuingCompany', {
      type: 'IssuingCompany',
      args: {
        where: 'IssuingCompanyWhereInput',
        orderBy: 'IssuingCompanyOrderByWithRelationInput',
        cursor: 'IssuingCompanyWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'IssuingCompanyScalarFieldEnum',
      },
      resolve(root: any) {
        return root.IssuingCompany
      },
    })
    t.list.field('DebtManageCommunication', {
      type: 'DebtManageCommunication',
      args: {
        where: 'DebtManageCommunicationWhereInput',
        orderBy: 'DebtManageCommunicationOrderByWithRelationInput',
        cursor: 'DebtManageCommunicationWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'DebtManageCommunicationScalarFieldEnum',
      },
      resolve(root: any) {
        return root.DebtManageCommunication
      },
    })
    t.list.field('CreditNoteType', {
      type: 'CreditNoteType',
      args: {
        where: 'CreditNoteTypeWhereInput',
        orderBy: 'CreditNoteTypeOrderByWithRelationInput',
        cursor: 'CreditNoteTypeWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CreditNoteTypeScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CreditNoteType
      },
    })
    t.list.field('MedicalForm', {
      type: 'MedicalForm',
      args: {
        where: 'MedicalFormWhereInput',
        orderBy: 'MedicalFormOrderByWithRelationInput',
        cursor: 'MedicalFormWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'MedicalFormScalarFieldEnum',
      },
      resolve(root: any) {
        return root.MedicalForm
      },
    })
    t.list.field('MedicalFormAdvancedSetting', {
      type: 'MedicalFormAdvancedSetting',
      args: {
        where: 'MedicalFormAdvancedSettingWhereInput',
        orderBy: 'MedicalFormAdvancedSettingOrderByWithRelationInput',
        cursor: 'MedicalFormAdvancedSettingWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'MedicalFormAdvancedSettingScalarFieldEnum',
      },
      resolve(root: any) {
        return root.MedicalFormAdvancedSetting
      },
    })
    t.list.field('MedicalFormContactHistory', {
      type: 'MedicalFormContactHistory',
      args: {
        where: 'MedicalFormContactHistoryWhereInput',
        orderBy: 'MedicalFormContactHistoryOrderByWithRelationInput',
        cursor: 'MedicalFormContactHistoryWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'MedicalFormContactHistoryScalarFieldEnum',
      },
      resolve(root: any) {
        return root.MedicalFormContactHistory
      },
    })
    t.list.field('MedicalAttr', {
      type: 'MedicalAttr',
      args: {
        where: 'MedicalAttrWhereInput',
        orderBy: 'MedicalAttrOrderByWithRelationInput',
        cursor: 'MedicalAttrWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'MedicalAttrScalarFieldEnum',
      },
      resolve(root: any) {
        return root.MedicalAttr
      },
    })
    t.list.field('Lab', {
      type: 'Lab',
      args: {
        where: 'LabWhereInput',
        orderBy: 'LabOrderByWithRelationInput',
        cursor: 'LabWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'LabScalarFieldEnum',
      },
      resolve(root: any) {
        return root.Lab
      },
    })
    t.list.field('CmLeadCustomField', {
      type: 'CmLeadCustomField',
      args: {
        where: 'CmLeadCustomFieldWhereInput',
        orderBy: 'CmLeadCustomFieldOrderByWithRelationInput',
        cursor: 'CmLeadCustomFieldWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmLeadCustomFieldScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmLeadCustomField
      },
    })
    t.list.field('CmLeadCustomFieldOrder', {
      type: 'CmLeadCustomFieldOrder',
      args: {
        where: 'CmLeadCustomFieldOrderWhereInput',
        orderBy: 'CmLeadCustomFieldOrderOrderByWithRelationInput',
        cursor: 'CmLeadCustomFieldOrderWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmLeadCustomFieldOrderScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmLeadCustomFieldOrder
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
    t.list.field('Communication', {
      type: 'Communication',
      args: {
        where: 'CommunicationWhereInput',
        orderBy: 'CommunicationOrderByWithRelationInput',
        cursor: 'CommunicationWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CommunicationScalarFieldEnum',
      },
      resolve(root: any) {
        return root.Communication
      },
    })
    t.list.field('CompanyEmail', {
      type: 'CompanyEmail',
      args: {
        where: 'CompanyEmailWhereInput',
        orderBy: 'CompanyEmailOrderByWithRelationInput',
        cursor: 'CompanyEmailWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyEmailScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyEmail
      },
    })
    t.list.field('TblModuleFieldsSetting', {
      type: 'TblModuleFieldsSetting',
      args: {
        where: 'TblModuleFieldsSettingWhereInput',
        orderBy: 'TblModuleFieldsSettingOrderByWithRelationInput',
        cursor: 'TblModuleFieldsSettingWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'TblModuleFieldsSettingScalarFieldEnum',
      },
      resolve(root: any) {
        return root.TblModuleFieldsSetting
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
    t.list.field('CmLabel', {
      type: 'CmLabel',
      args: {
        where: 'CmLabelWhereInput',
        orderBy: 'CmLabelOrderByWithRelationInput',
        cursor: 'CmLabelWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmLabelScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmLabel
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
    t.list.field('LeadStatus', {
      type: 'LeadStatus',
      args: {
        where: 'LeadStatusWhereInput',
        orderBy: 'LeadStatusOrderByWithRelationInput',
        cursor: 'LeadStatusWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'LeadStatusScalarFieldEnum',
      },
      resolve(root: any) {
        return root.LeadStatus
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
    t.list.field('ContactPreference', {
      type: 'ContactPreference',
      args: {
        where: 'ContactPreferenceWhereInput',
        orderBy: 'ContactPreferenceOrderByWithRelationInput',
        cursor: 'ContactPreferenceWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ContactPreferenceScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ContactPreference
      },
    })
    t.list.field('CreditBalance', {
      type: 'CreditBalance',
      args: {
        where: 'CreditBalanceWhereInput',
        orderBy: 'CreditBalanceOrderByWithRelationInput',
        cursor: 'CreditBalanceWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CreditBalanceScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CreditBalance
      },
    })
    t.list.field('ActivityUserState', {
      type: 'ActivityUserState',
      args: {
        where: 'ActivityUserStateWhereInput',
        orderBy: 'ActivityUserStateOrderByWithRelationInput',
        cursor: 'ActivityUserStateWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ActivityUserStateScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ActivityUserState
      },
    })
    t.list.field('ActivityUserFilter', {
      type: 'ActivityUserFilter',
      args: {
        where: 'ActivityUserFilterWhereInput',
        orderBy: 'ActivityUserFilterOrderByWithRelationInput',
        cursor: 'ActivityUserFilterWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ActivityUserFilterScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ActivityUserFilter
      },
    })
    t.list.field('ActivityType', {
      type: 'ActivityType',
      args: {
        where: 'ActivityTypeWhereInput',
        orderBy: 'ActivityTypeOrderByWithRelationInput',
        cursor: 'ActivityTypeWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ActivityTypeScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ActivityType
      },
    })
    t.list.field('Album', {
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
        return root.Album
      },
    })
    t.list.field('InsurerContract', {
      type: 'InsurerContract',
      args: {
        where: 'InsurerContractWhereInput',
        orderBy: 'InsurerContractOrderByWithRelationInput',
        cursor: 'InsurerContractWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InsurerContractScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InsurerContract
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
    t.list.field('ContactAttachment', {
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
        return root.ContactAttachment
      },
    })
    t.list.field('SmsSender', {
      type: 'SmsSender',
      args: {
        where: 'SmsSenderWhereInput',
        orderBy: 'SmsSenderOrderByWithRelationInput',
        cursor: 'SmsSenderWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'SmsSenderScalarFieldEnum',
      },
      resolve(root: any) {
        return root.SmsSender
      },
    })
    t.list.field('Pathway', {
      type: 'Pathway',
      args: {
        where: 'PathwayWhereInput',
        orderBy: 'PathwayOrderByWithRelationInput',
        cursor: 'PathwayWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PathwayScalarFieldEnum',
      },
      resolve(root: any) {
        return root.Pathway
      },
    })
    t.list.field('PathwayStep', {
      type: 'PathwayStep',
      args: {
        where: 'PathwayStepWhereInput',
        orderBy: 'PathwayStepOrderByWithRelationInput',
        cursor: 'PathwayStepWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PathwayStepScalarFieldEnum',
      },
      resolve(root: any) {
        return root.PathwayStep
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
    t.list.field('Recall', {
      type: 'Recall',
      args: {
        where: 'RecallWhereInput',
        orderBy: 'RecallOrderByWithRelationInput',
        cursor: 'RecallWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'RecallScalarFieldEnum',
      },
      resolve(root: any) {
        return root.Recall
      },
    })
    t.list.field('CustomFieldDisplay', {
      type: 'CustomFieldDisplay',
      args: {
        where: 'CustomFieldDisplayWhereInput',
        orderBy: 'CustomFieldDisplayOrderByWithRelationInput',
        cursor: 'CustomFieldDisplayWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CustomFieldDisplayScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CustomFieldDisplay
      },
    })
    t.list.field('Pipeline', {
      type: 'Pipeline',
      args: {
        where: 'PipelineWhereInput',
        orderBy: 'PipelineOrderByWithRelationInput',
        cursor: 'PipelineWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PipelineScalarFieldEnum',
      },
      resolve(root: any) {
        return root.Pipeline
      },
    })
    t.list.field('PipelineStage', {
      type: 'PipelineStage',
      args: {
        where: 'PipelineStageWhereInput',
        orderBy: 'PipelineStageOrderByWithRelationInput',
        cursor: 'PipelineStageWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PipelineStageScalarFieldEnum',
      },
      resolve(root: any) {
        return root.PipelineStage
      },
    })
    t.nullable.field('_count', {
      type: 'CompanyCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})

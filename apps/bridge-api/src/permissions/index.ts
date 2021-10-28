import { allow, and, or, shield } from 'graphql-shield'
import * as rules from './types'

console.log('Creating shield...')

export const permissions = shield(
  {
    Mutation: {
      enroll: rules.authentication.isAuthenticated,
      // Products
      createOneInvProduct: or(
        rules.authentication.isAdmin,
        rules.stock.stockManager
      ),
      deleteOneInvProduct: or(
        rules.authentication.isAdmin,
        rules.stock.stockManager
      ),
      updateOneInvProduct: or(
        rules.authentication.isAdmin,
        rules.stock.stockManager
      ),
      //UserPermission
      updateOneUserPermission: and(
        rules.authentication.isAuthenticated,
        rules.authentication.isAdmin
      ),
      deleteOneUserPermission: and(
        rules.authentication.isAuthenticated,
        rules.authentication.isAdmin
      ),
      createOneUserPermission: and(
        rules.authentication.isAuthenticated,
        rules.authentication.isAdmin
      ),
      //StaffMeta
      createOneStaffMeta: and(
        rules.authentication.isAuthenticated,
        rules.authentication.isAdmin
      ),
      updateOneStaffMeta: and(
        rules.authentication.isAuthenticated,
        rules.authentication.isAdmin
      ),
      deleteOneStaffMeta: and(
        rules.authentication.isAuthenticated,
        rules.authentication.isAdmin
      ),
      //CompanyMeta
      setOneCompanyMeta: rules.authentication.isAdmin,
      setManyCompanyMeta: rules.authentication.isAdmin,

      //Update User Password
      changePassword: rules.authentication.isAuthenticated,

      // Send Email
      sendEmail: rules.authentication.isAuthenticated,
      sendEmailTo: rules.authentication.isAuthenticated,
      resetPassword: allow,

      //Page
      createOnePage: rules.authentication.isAuthenticated,
      updateOnePage: and(
        rules.authentication.isAuthenticated,
        rules.authentication.isAdmin
      ),
      deleteOnePage: and(
        rules.authentication.isAuthenticated,
        rules.authentication.isAdmin
      ),
      createOneLead: rules.authentication.isAuthenticated,
      //Country
      createOneCountry: rules.authentication.isAuthenticated,
      //MedicalFormContact
      createOneMedicalFormContact: rules.authentication.isAuthenticated,
      //CmContactNode
      createOneContactNote: rules.authentication.isAuthenticated,
      //UserGroup
      updateOneUserGroup: rules.authentication.isAdmin,
      deleteOneUserGroup: rules.authentication.isAdmin,

      // Send Email Without User Login
      sendEmailWithoutLogIn: allow,

      // Public access mutations
      login: allow,
      forgotPassword: allow,
      switchCompany: rules.authentication.isAuthenticated,

      upsertUserReportByReportCode: rules.authentication.isAdmin,
      createOneContact: rules.authentication.isAuthenticated,
      updateOneContact: rules.authentication.isAuthenticated,
      createOneContactAttachment: rules.authentication.isAuthenticated,
      deleteOneContactAttachment: rules.authentication.isAuthenticated,

      upsertManyStaffMetaByGroupId: and(
        rules.authentication.isAuthenticated,
        rules.authentication.isAdmin
      ),

      //CompanyBranches
      createOneCompanyBranchWithAssignedStaff: rules.authentication.isAdmin,
      updateOneCompanyBranchWithAssignedStaff: rules.authentication.isAdmin,

      updateOneCompany: rules.authentication.isAdmin,
      updateManyUser: rules.authentication.isAdmin,
      upsertManyUsersPermissionByGroupId: rules.authentication.isAdmin,
      upsertManyUsersReportsByGroupId: rules.authentication.isAdmin,
      upsertGroupPermissionFeatureByGroupId: rules.authentication.isAdmin,
      updateManyInvBiller: rules.authentication.isAdmin,
      updateManyStaffMetaFeaturesByGroupId: rules.authentication.isAdmin,
      upsertManyUsersMainPermissionByGroupId: rules.authentication.isAdmin,
      updateOneCmLead: rules.authentication.isAuthenticated,
      //Activity
      upsertOneActivityUserState: rules.authentication.isAuthenticated,
      deleteManyActivity: rules.authentication.isAuthenticated,
      deleteContactAttachmentPhoto: rules.authentication.isAuthenticated,
      createDuplicateActivity: rules.authentication.isAuthenticated,
      //Connect Public
      public_createOnlineBooking: allow,
      // Default fallback
      '*': and(
        rules.authentication.isAuthenticated,
        rules.interceptors.injectCompany,
        rules.interceptors.injectUser
      ),
    },
    Query: {
      findManyContactPackage: allow,
      findManyBooking: allow,
      findFirstUserMaster: allow,
      findManyLoyaltyPoints: allow,
      findManyTimezone: allow,
      findManyInvoice: rules.authentication.isAuthenticated,
      aggregateInvoice: rules.authentication.isAuthenticated,
      findManyPathwaysTaken: allow,
      findManyPathwayStepsTaken: allow,
      //StaffMeta
      findFirstStaffMeta: rules.authentication.isAuthenticated,
      findManyStaffMeta: rules.authentication.isAuthenticated,
      findManyStaffMetaCount: rules.authentication.isAuthenticated,
      // //UserGroup
      findManyUserGroupMemberCount: rules.authentication.isAuthenticated,
      findManyUserGroupMember: rules.authentication.isAuthenticated,
      findFirstUserGroupMember: rules.authentication.isAuthenticated,
      // //BnfDrug
      findFirstBnfDrug: rules.authentication.isAuthenticated,
      findManyBnfDrug: rules.authentication.isAuthenticated,
      findManyBnfDrugCount: rules.authentication.isAuthenticated,
      // //TrainingCourse
      findFirstTrainingCourse: rules.authentication.isAuthenticated,
      findManyTrainingCourse: rules.authentication.isAuthenticated,
      findManyTrainingCourseCount: rules.authentication.isAuthenticated,
      // //Page
      findFirstReport: rules.interceptors.interceptSharedCompanyData,
      findManyReport: rules.interceptors.interceptSharedCompanyData,
      findManyReportCount: rules.interceptors.interceptSharedCompanyData,
      retrieveReport: rules.authentication.isAuthenticated,
      retrieveTrendReport: rules.authentication.isAuthenticated,
      //ReportCategory
      findFirstReportCategory: rules.interceptors.interceptSharedCompanyData,
      findManyReportCategory: rules.interceptors.interceptSharedCompanyData,
      findManyReportCategoryCount:
        rules.interceptors.interceptSharedCompanyData,
      findFirstPage: rules.authentication.isAuthenticated,
      findManyPage: rules.authentication.isAuthenticated,
      findManyPageCount: rules.authentication.isAuthenticated,
      //InvPaymentType
      findManyInvPaymentType: rules.interceptors.interceptSharedCompanyData,
      findManyInvPaymentTypeCount:
        rules.interceptors.interceptSharedCompanyData,
      findFirstInvPaymentType: rules.interceptors.interceptSharedCompanyData,
      findUniqueInvPaymentType: rules.interceptors.interceptSharedCompanyData,
      // //ContactNote
      findFirstContactNote: rules.authentication.isAuthenticated,
      findManyContactNote: rules.authentication.isAuthenticated,
      findManyContactNoteCount: rules.authentication.isAuthenticated,
      // //UserMainPermission
      findFirstUserMainPermission: rules.authentication.isAuthenticated,
      findManyUserMainPermission: rules.authentication.isAuthenticated,
      findManyUserMainPermissionCount: rules.authentication.isAuthenticated,
      // //UserAlert
      findFirstUserAlert: rules.authentication.isAuthenticated,
      findManyUserAlert: rules.authentication.isAuthenticated,
      findManyUserAlertCount: rules.authentication.isAuthenticated,
      // //UserAlertType
      findFirstUserAlertType: rules.authentication.isAuthenticated,
      findManyUserAlertType: rules.authentication.isAuthenticated,
      findManyUserAlertTypeCount: rules.authentication.isAuthenticated,
      // //SocialSurveyAnswer
      findFirstSocialSurveyAnswer: rules.authentication.isAuthenticated,
      findManySocialSurveyAnswer: rules.authentication.isAuthenticated,
      findManySocialSurveyAnswerCount: rules.authentication.isAuthenticated,
      // //Country
      findFirstCountry: rules.authentication.isAuthenticated,
      findManyCountry: rules.authentication.isAuthenticated,
      findManyCountryCount: rules.authentication.isAuthenticated,
      // //MedicalFormContact
      findFirstMedicalFormContact: rules.authentication.isAuthenticated,
      findManyMedicalFormContact: rules.authentication.isAuthenticated,
      findManyMedicalFormContactCount: rules.authentication.isAuthenticated,
      // Permissions
      findManyUserPermission: rules.authentication.isAuthenticated,
      findManyUserPermissionCount: rules.authentication.isAuthenticated,
      findFirstUserPermission: rules.authentication.isAuthenticated,
      findManyLocationsWithAvailableProductStock: rules.authentication.isAdmin,
      findManyFilteredRotaShift: rules.authentication.isAuthenticated,

      findManyProductsWithAvailableQuantity:
        rules.authentication.isAuthenticated,
      findManyProductsWithAvailableQuantityCount:
        rules.authentication.isAuthenticated,
      findFirstPasswordResetAuth:
        rules.interceptors.interceptResetPasswordToken,
      //CmLabels
      findManyCmLabel: rules.interceptors.interceptSharedCompanyData,
      // Authentication
      me: rules.authentication.isAuthenticated,
      // Activity
      findManyActivityType: and(
        rules.authentication.isAuthenticated,
        rules.interceptors.interceptSharedCompanyData
      ),
      findFirstActivityUserState: and(
        rules.authentication.isAuthenticated,
        rules.interceptors.interceptAccessToCompanyData,
        rules.interceptors.interceptAccessToUserData
      ),
      getBookingStatusCount: rules.authentication.isAuthenticated,
      getBookingChartDetail: rules.authentication.isAuthenticated,
      // getToken
      getRefreshToken: rules.authentication.isAuthenticated,
      // Debug
      ping: allow,
      version: allow,
      findManyCustomReportWithPermissions: rules.authentication.isAdmin,
      //user: rules.authentication.isAuthenticated, //TODO: insecure, fix in pure branch by masquerading the user/findOneUser and turning it into a findFirstUser in the shield injection.
      staffList: rules.authentication.isAuthenticated,
      //Subscriptions
      subscriptionInvoices: rules.authentication.isAuthenticated,
      subscriptionInvoicesTotal: rules.authentication.isAuthenticated,
      subscriptionDetails: rules.authentication.isAuthenticated,
      subscriptionCardDetails: rules.authentication.isAuthenticated,
      // Connect Public
      findFirstCompany: allow,
      Public_MasterCategories: allow,
      Public_BookedAppointments: allow,
      Public_Locations: allow,
      Public_ServiceCategories: allow,
      Public_StaffShifts: allow,
      Public_Staff: allow,
      // invoice
      getInvoiceData: rules.authentication.isAuthenticated,
      //statement template
      getStatementData: rules.authentication.isAuthenticated,
      //TODO once jest mocks are resolved move it to rules.authentication.isAuthenticated
      featureRequestsWeeklyAvg: allow,
      '*': and(
        rules.authentication.isAuthenticated,
        rules.interceptors.interceptAccessToCompanyData
      ),
    },
  },
  {
    fallbackError: async (error: Error, _parent, args, _context, info) => {
      console.error(
        '\nThrown with args:',
        args,
        '\nResolver info :',
        info.path,
        '\nModel :',
        info.returnType,
        '\nError :',
        error
      )
      return error
    },
  }
)

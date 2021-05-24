import { allow, and, shield } from 'graphql-shield'
import * as rules from './types'

export const permissions = shield(
  {
    Mutation: {
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
      setOneCompanyMeta: and(
        rules.authentication.isAuthenticated,
        rules.authentication.isAdmin
      ),
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
      //Country
      createOneCountry: rules.authentication.isAuthenticated,
      //MedicalFormContact
      createOneMedicalFormContact: rules.authentication.isAuthenticated,
      //CmContactNode
      createOneCmContactNote: rules.authentication.isAuthenticated,
      //UserGroup
      createOneUserGroup: and(
        rules.authentication.isAuthenticated,
        rules.authentication.isAdmin
      ),
      updateOneUserGroup: and(
        rules.authentication.isAuthenticated,
        rules.authentication.isAdmin
      ),
      deleteOneUserGroup: and(
        rules.authentication.isAuthenticated,
        rules.authentication.isAdmin
      ),
      //Pabau bespoke
      login: allow,
      logout: rules.authentication.isAuthenticated,
      upsertManyStaffMetaByGroupId: and(
        rules.authentication.isAuthenticated,
        rules.authentication.isAdmin
      ),
      '*': and(
        rules.authentication.isAuthenticated,
        rules.authentication.isAdmin,
        rules.interceptors.interceptMutation
      ),
    },
    Query: {
      //StaffMeta
      findFirstStaffMeta: rules.authentication.isAuthenticated,
      findManyStaffMeta: rules.authentication.isAuthenticated,
      // //UserGroup
      findManyUserGroupMember: rules.authentication.isAuthenticated,
      findFirstUserGroupMember: rules.authentication.isAuthenticated,
      // //Report
      findFirstReport: and(
        rules.authentication.isAuthenticated,
        rules.interceptors.interceptSharedCompanyData
      ),
      findManyReport: and(
        rules.authentication.isAuthenticated,
        rules.interceptors.interceptSharedCompanyData
      ),
      retrieveReport: rules.authentication.isAuthenticated,
      //ReportCategory
      findFirstReportCategory: and(
        rules.authentication.isAuthenticated,
        rules.interceptors.interceptSharedCompanyData
      ),
      findManyReportCategory: and(
        rules.authentication.isAuthenticated,
        rules.interceptors.interceptSharedCompanyData
      ),
      // //BnfDrug
      findFirstBnfDrug: rules.authentication.isAuthenticated,
      findManyBnfDrug: rules.authentication.isAuthenticated,
      // //TrainingCourse
      findFirstTrainingCourse: rules.authentication.isAuthenticated,
      findManyTrainingCourse: rules.authentication.isAuthenticated,
      // //Page
      findFirstPage: rules.authentication.isAuthenticated,
      findManyPage: rules.authentication.isAuthenticated,
      // //CmContactNote
      findFirstCmContactNote: rules.authentication.isAuthenticated,
      findManyCmContactNote: rules.authentication.isAuthenticated,
      // //UserMainPermission
      findFirstUserMainPermission: rules.authentication.isAuthenticated,
      findManyUserMainPermission: rules.authentication.isAuthenticated,
      // //UserAlert
      findFirstUserAlert: rules.authentication.isAuthenticated,
      findManyUserAlert: rules.authentication.isAuthenticated,
      // //UserAlertType
      findFirstUserAlertType: rules.authentication.isAuthenticated,
      findManyUserAlertType: rules.authentication.isAuthenticated,
      // //SocialSurveyAnswer
      findFirstSocialSurveyAnswer: rules.authentication.isAuthenticated,
      findManySocialSurveyAnswer: rules.authentication.isAuthenticated,
      // //Country
      findFirstCountry: rules.authentication.isAuthenticated,
      findManyCountry: rules.authentication.isAuthenticated,
      // //MedicalFormContact
      findFirstMedicalFormContact: rules.authentication.isAuthenticated,
      findManyMedicalFormContact: rules.authentication.isAuthenticated,
      // //UserPermission
      findManyUserPermission: rules.authentication.isAuthenticated,
      findFirstUserPermission: rules.authentication.isAuthenticated,
      // //Authentication
      me: rules.authentication.isAuthenticated,
      company: rules.authentication.isAuthenticated,
      ping: allow,
      //TODO once jest mocks are resolved move it to rules.authentication.isAuthenticated
      featureRequestsWeeklyAvg: allow,
      '*': and(
        rules.authentication.isAuthenticated,
        rules.interceptors.interceptAccessToCompanyData
      ),
    },
  },
  {
    fallbackError: async (error: Error, parent, args, context, info) => {
      console.error(
        '\nThrown with args:',
        args,
        '\nResolver info :',
        info.path,
        '\nReturn type',
        info.returnType
      )
      return error
    },
  }
)

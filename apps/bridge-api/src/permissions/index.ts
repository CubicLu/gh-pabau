import { allow, and, shield } from 'graphql-shield'
import * as rules from './types'

export const permissions = shield(
  {
    Mutation: {
      //UserPermission
      updateOneUserPermission: rules.authentication.isAdmin,
      deleteOneUserPermission: rules.authentication.isAdmin,
      createOneUserPermission: rules.authentication.isAdmin,

      //StaffMeta
      createOneStaffMeta: rules.authentication.isAdmin,
      updateOneStaffMeta: rules.authentication.isAdmin,
      deleteOneStaffMeta: rules.authentication.isAdmin,
      upsertManyStaffMetaByGroupId: rules.authentication.isAdmin,

      //CompanyMeta
      setOneCompanyMeta: rules.authentication.isAdmin,

      //Page
      updateOnePage: rules.authentication.isAdmin,
      deleteOnePage: rules.authentication.isAdmin,

      //UserGroup
      createOneUserGroup: rules.authentication.isAdmin,
      updateOneUserGroup: rules.authentication.isAdmin,
      deleteOneUserGroup: rules.authentication.isAdmin,

      // Public access mutations
      login: allow,

      // Default fallback
      '*': rules.interceptors.interceptMutation,
    },
    Query: {
      // //Report
      findFirstReport: rules.interceptors.interceptSharedCompanyData,
      // findManyReport: rules.interceptors.interceptSharedCompanyData,

      //ReportCategory
      findFirstReportCategory: rules.interceptors.interceptSharedCompanyData,
      // findManyReportCategory: rules.interceptors.interceptSharedCompanyData,

      // Public access queries
      ping: allow,

      // Default fallback
      '*': rules.interceptors.interceptAccessToCompanyData,
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

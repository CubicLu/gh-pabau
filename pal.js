module.exports = {
  backend: {
    generator: 'nexus-plugin-prisma',
    output: 'apps/bridge-api/src/generated/types',
    excludeQueriesAndMutations: ['deleteMany', 'createMany'],
    excludeQueriesAndMutationsByModel: {
      StaffMeta: ['updateMany'],
      UserGroup: ['updateMany'],
      CompanyPermission: ['updateMany'],
      CmContactLocation: ['updateMany'],
      companyMeta: ['upsertOne', 'updateMany'],
      XeroIntegration: ['updateMany'],
      CompanyRoomLocation: ['updateMany'],
      UserGroupMember: ['updateMany'],
      UserPermission: ['updateMany'],
      UserReport: ['updateMany'],
      Company: ['findUnique', 'createOne', 'upsertOne', 'deleteOne'],
    },
  },
}

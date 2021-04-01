module.exports = {
  backend: {
    generator: 'nexus-plugin-prisma',
    output: 'apps/bridge-api/src/generated/types',
    excludeQueriesAndMutations: [
      'deleteMany',
      'upsertMany',
      'createMany',
    ],
    excludeQueriesAndMutationsByModel: {
      CompanyRoomLocation: [
        'updateMany'
      ],
      UserGroupMember: [
        'updateMany'
      ],
      UserPermission: [
        'updateMany'
      ],
      UserReport: [
        'updateMany'
      ],
      Company: [
        'findUnique',
        'createOne',
        'upsertOne',
        'deleteOne'
      ]
    }
  },
};

module.exports = {
  backend: {
    generator: 'nexus-plugin-prisma',
    output: 'apps/bridge-api/src/generated/types',
    excludeQueriesAndMutations: [
      'deleteMany',
      'updateMany',
      'upsertMany',
      'createMany',
    ]
  },
};

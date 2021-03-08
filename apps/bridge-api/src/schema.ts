import { makeSchema  } from 'nexus'
import { nexusPrisma } from 'nexus-plugin-prisma'
import { PrismaClient } from '@prisma/client'
import * as generatedTypes from './generated/types'
import * as customTypes from '../src/schema/types'
import { GraphQLSchema } from 'graphql';
import { NexusSchemaExtension } from 'nexus/dist/extensions';
import { paljs } from '@paljs/nexus';

const prisma = new PrismaClient()

export const schema: Omit<GraphQLSchema, "extensions"> & { extensions: { nexus: NexusSchemaExtension } } = makeSchema({
  types: [generatedTypes, customTypes],
  plugins: [
    paljs(),
    nexusPrisma({
    experimentalCRUD: true, prismaClient: ctx => ctx.prisma = prisma })],
  outputs: {
    schema: __dirname + '/generated/schema.gen.graphql',
    typegen:__dirname + '/generated/typegen-nexus-plugin-prisma.d.ts',
  },
  sourceTypes: {
    headers: [
      'import { ConnectionFieldOpts } from "@packages/api-graphql/src/extensions/connectionType"',
    ],
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
    mapping: {
      Date: 'string',
      DateTime: 'string',
      UUID: 'string',
    },
  },
})

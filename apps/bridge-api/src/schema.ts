import { paljs } from '@paljs/nexus'
import { makeSchema } from 'nexus'
import * as types from './resolvers'
import * as generatedTypes from './generated/types'
//TODO: speed this up
console.log('Loading schema (this may take up to a minute)...')

console.time('schema-load')
export const schema = makeSchema({
  plugins: [paljs()],
  shouldGenerateArtifacts: process.argv.includes('--nexus-typegen'),
  // shouldExitAfterGenerateArtifacts: true,
  types: [generatedTypes, types],
  outputs: {
    typegen: __dirname + '/generated/nexus.d.ts',
  },
  sourceTypes: {
    modules: [
      {
        module: '.prisma/client',
        alias: 'prisma',
      },
    ],
  },
  contextType: {
    export: 'Context',
    module: __dirname + '/../../apps/bridge-api/src/context.ts',
    // alias: 'ctx',
  },
})
console.timeEnd('schema-load')

//WIP

import {DefinitionNode, parse, SchemaDefinitionNode} from 'graphql'
import {readFileSync} from "fs";
import * as path from "path";

const {definitions} = parse(readFileSync(path.resolve(process.cwd(), "hasura/schema.graphql")).toString())
const kindFilter = (kind: string) => (definition: typeof definitions[0]) => definition.kind === kind
function schemaDefinitionKindFilter(definition: DefinitionNode): definition is SchemaDefinitionNode {
  return definition.kind === "SchemaDefinition"
}
if (definitions.filter(schemaDefinitionKindFilter).length !== 1) throw new Error("Mismatch!")
const schemaDefinition = definitions.find<SchemaDefinitionNode>(schemaDefinitionKindFilter)
if (schemaDefinition.kind === "SchemaDefinition") {
  // schemaDefinition.
}

console.log(schemaDefinition)

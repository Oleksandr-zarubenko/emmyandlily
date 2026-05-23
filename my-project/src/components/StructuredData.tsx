import type { Graph, Thing, WithContext } from "schema-dts";

export type StructuredDataSchema = Graph | WithContext<Thing>;

const serializeStructuredData = (schema: StructuredDataSchema): string =>
  JSON.stringify(schema).replace(/</g, "\\u003c");

export function StructuredData({
  id,
  schema,
}: {
  id: string;
  schema: StructuredDataSchema;
}) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeStructuredData(schema) }}
    />
  );
}

import { Relation } from 'pinia-orm';

function getClassAttributes(PiniaOrmClass) {
  const fields = new PiniaOrmClass().$fields();
  return Object.fromEntries(Object.entries(fields).map(([key, schema]) => {
    const definition = {
      ...schema,
      kind: schema.constructor.name,
      isRelationship: schema instanceof Relation,
      key
    };
    return [key, definition];
  }).filter(([_key, schema]) => typeof schema === "object" ? !schema.isRelationship : false));
}

function getClassFields(PiniaOrmClass) {
  const fields = new PiniaOrmClass().$fields();
  return Object.fromEntries(Object.entries(fields).map(([key, schema]) => {
    const definition = {
      ...schema,
      kind: schema.constructor.name,
      isRelationship: schema instanceof Relation,
      key
    };
    return [key, definition];
  }));
}

function getClassRelationships(PiniaOrmClass) {
  const fields = new PiniaOrmClass().$fields();
  return Object.fromEntries(Object.entries(fields).map(([key, schema]) => {
    const definition = {
      ...schema,
      kind: schema.constructor.name,
      isRelationship: schema instanceof Relation,
      key
    };
    return [key, definition];
  }).filter(([_key, schema]) => typeof schema === "object" ? !schema.isRelationship : false));
}

export { getClassAttributes, getClassFields, getClassRelationships };

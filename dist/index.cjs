'use strict';

const piniaOrm = require('pinia-orm');

function getClassAttributes(PiniaOrmClass) {
  const fields = new PiniaOrmClass().$fields();
  return Object.fromEntries(Object.entries(fields).map(([key, schema]) => {
    const definition = {
      ...schema,
      kind: schema.constructor.name,
      isRelationship: schema instanceof piniaOrm.Relation,
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
      isRelationship: schema instanceof piniaOrm.Relation,
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
      isRelationship: schema instanceof piniaOrm.Relation,
      key
    };
    return [key, definition];
  }).filter(([_key, schema]) => typeof schema === "object" ? schema.isRelationship : false));
}

class ObjectCast extends piniaOrm.CastAttribute {
  /**
   * Create a new String attribute instance.
   */
  constructor(attributes) {
    super(attributes);
  }
  get(value) {
    if (value?.startsWith?.("[")) {
      return {};
    }
    return typeof value !== "string" ? value : JSON.parse(value);
  }
  /**
   * Make the value for the attribute.
   */
  set(value) {
    if (value?.startsWith?.("[")) {
      return "{}";
    }
    return JSON.stringify(value);
  }
}

exports.ObjectCast = ObjectCast;
exports.getClassAttributes = getClassAttributes;
exports.getClassFields = getClassFields;
exports.getClassRelationships = getClassRelationships;

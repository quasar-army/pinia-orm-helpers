import { Model, Type, Attribute, Relation, CastAttribute, ModelFields } from 'pinia-orm';

type PiniaOrmDecoratorKind = 'Attr' | 'Str' | 'Num' | 'Bool' | 'Uid' | 'HasOne' | 'BelongsTo' | 'BelongsToMany' | 'HasMany' | 'HasManyBy' | 'HasManyThrough' | 'MorphOne' | 'MorphTo' | 'MorphToMany' | 'MorphMany';

declare function getClassAttributes<ModelType extends typeof Model>(PiniaOrmClass: ModelType): Record<Exclude<Exclude<keyof RemoveIndex<InstanceType<ModelType>>, "_meta" | "$self" | "$entity" | "$config" | "$baseEntity" | "$typeKey" | "$types" | "$piniaOptions" | "$primaryKey" | "$fields" | "$hidden" | "$visible" | "$newInstance" | "$casts" | "$fill" | "$getKeyName" | "$getKey" | "$hasCompositeKey" | "$getIndexId" | "$getLocalKey" | "$getRelation" | "$setRelation" | "$getMutators" | "$getCasts" | "$getOriginal" | "$refresh" | "$isDirty" | "$getAttributes" | "$toJson">, { [K in keyof DeclassifyPiniaOrmModel<InstanceType<ModelType>>]: DeclassifyPiniaOrmModel<InstanceType<ModelType>>[K] extends Model | Model[] | null ? K : never; }[Exclude<keyof RemoveIndex<InstanceType<ModelType>>, "_meta" | "$self" | "$entity" | "$config" | "$baseEntity" | "$typeKey" | "$types" | "$piniaOptions" | "$primaryKey" | "$fields" | "$hidden" | "$visible" | "$newInstance" | "$casts" | "$fill" | "$getKeyName" | "$getKey" | "$hasCompositeKey" | "$getIndexId" | "$getLocalKey" | "$getRelation" | "$setRelation" | "$getMutators" | "$getCasts" | "$getOriginal" | "$refresh" | "$isDirty" | "$getAttributes" | "$toJson">]>, Type & {
    kind: PiniaOrmDecoratorKind;
    isRelationship: boolean;
    key: string;
}>;

declare function getClassFields<ModelType extends typeof Model>(PiniaOrmClass: ModelType): Record<keyof InstanceType<ModelType>, Attribute & {
    kind: PiniaOrmDecoratorKind;
    isRelationship: boolean;
    key: string;
}>;

type RelationshipDefinition = Relation & {
    kind: PiniaOrmDecoratorKind;
    isRelationship: boolean;
    key: string;
};
declare function getClassRelationships<ModelType extends typeof Model>(PiniaOrmClass: ModelType): Record<{ [K in keyof DeclassifyPiniaOrmModel<InstanceType<ModelType>>]: DeclassifyPiniaOrmModel<InstanceType<ModelType>>[K] extends Model | Model[] | null ? K : never; }[Exclude<keyof RemoveIndex<InstanceType<ModelType>>, "_meta" | "$self" | "$entity" | "$config" | "$baseEntity" | "$typeKey" | "$types" | "$piniaOptions" | "$primaryKey" | "$fields" | "$hidden" | "$visible" | "$newInstance" | "$casts" | "$fill" | "$getKeyName" | "$getKey" | "$hasCompositeKey" | "$getIndexId" | "$getLocalKey" | "$getRelation" | "$setRelation" | "$getMutators" | "$getCasts" | "$getOriginal" | "$refresh" | "$isDirty" | "$getAttributes" | "$toJson">], RelationshipDefinition>;

declare class ObjectCast extends CastAttribute {
    /**
     * Create a new String attribute instance.
     */
    constructor(attributes: ModelFields);
    get(value: any): any;
    /**
     * Make the value for the attribute.
     */
    set(value: any): string;
}

type RemoveIndex<T> = {
    [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K];
};

type DeclassifyPiniaOrmModel<T extends Model> = Omit<RemoveIndex<T>, keyof RemoveIndex<Model>>;

type FilterPiniaOrmModelToRelationshipTypes<T extends Model> = Pick<DeclassifyPiniaOrmModel<T>, {
    [K in keyof DeclassifyPiniaOrmModel<T>]: DeclassifyPiniaOrmModel<T>[K] extends Model | null | Model[] ? K : never;
}[keyof DeclassifyPiniaOrmModel<T>]>;

type FilterPiniaOrmModelToFieldTypes<T extends Model> = Omit<DeclassifyPiniaOrmModel<T>, keyof FilterPiniaOrmModelToRelationshipTypes<T>>;

type DeclassifyPiniaOrmModels<T> = T extends Model ? DeclassifyPiniaOrmModel<T> : never;

type PiniaOrmForm<T extends Model> = Partial<Omit<DeclassifyPiniaOrmModel<T>, keyof FilterPiniaOrmModelToRelationshipTypes<T>>>;

export { type DeclassifyPiniaOrmModel, type DeclassifyPiniaOrmModels, type FilterPiniaOrmModelToFieldTypes, type FilterPiniaOrmModelToRelationshipTypes, ObjectCast, type PiniaOrmDecoratorKind, type PiniaOrmForm, type RemoveIndex, getClassAttributes, getClassFields, getClassRelationships };

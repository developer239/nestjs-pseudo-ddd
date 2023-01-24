/* eslint-disable @typescript-eslint/no-unused-vars,security/detect-object-injection */

// Example
//
// export type ProductRequiredProperties = Required<{
//   readonly id: number
//   readonly name: string
//   readonly description: string
//   readonly price: number
// }>
//
// export type ProductOptionalProperties = Partial<{}>
//
// export type ProductProperties = ProductRequiredProperties &
//   ProductOptionalProperties

// TODO: move to core @collection package
export class BaseModel<
  TRequiredProperties,
  TOptionalProperties,
  TUnsavedProperties
> {
  constructor(properties: TRequiredProperties & TOptionalProperties) {
    Object.assign(this, properties)
  }

  public properties(): TRequiredProperties & TOptionalProperties {
    const properties = Object.getOwnPropertyNames(this)

    const returnValue = {}
    for (const property of properties) {
      // @ts-ignore
      returnValue[property] = this[property]
    }

    return returnValue as TRequiredProperties & TOptionalProperties
  }
}

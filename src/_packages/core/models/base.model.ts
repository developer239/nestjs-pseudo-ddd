/* eslint-disable @typescript-eslint/no-unused-vars,security/detect-object-injection */

export class BaseModel<TProperties> {
  constructor(properties: TProperties) {
    Object.assign(this, properties)
  }

  public properties(): TProperties {
    const properties = Object.getOwnPropertyNames(this)

    const returnValue = {}
    for (const property of properties) {
      // @ts-ignore
      returnValue[property] = this[property]
    }

    return returnValue as TProperties
  }
}

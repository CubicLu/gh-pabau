export class UniqueConstraintError extends Error {
  public fieldName: string
  constructor(field_name: string, public modelName?: string) {
    super(`Data constraint violation, ${field_name} must be unique`)
    this.fieldName = field_name
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export class BaseCollection<TModel> {
  private readonly data: TModel[] = []

  constructor(data?: TModel[]) {
    this.data = data || []
  }

  public getAll(): TModel[] {
    return this.data
  }

  public add(item: TModel): BaseCollection<TModel> {
    this.data.push(item)

    return this
  }
}

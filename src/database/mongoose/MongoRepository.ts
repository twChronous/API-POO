import type {
    Query,
    Model,
    Document,
    Mongoose,
    FilterQuery,
    UpdateQuery,
    QueryOptions,
    Model as ModelType,
  } from 'mongoose'
  
  interface IRepositoryDocument extends Document {
    _id: string;
}

export default class MongoRepository<T extends IRepositoryDocument> {
    #model: Model<T>;
    private mongoose: Mongoose
    constructor(mongoose: Mongoose, model: Model<T>) {
        if (!mongoose || !model) throw new Error('Mongoose model cannot be null.');
        this.mongoose = mongoose;
        this.#model = model;
    }
  
    get model(): ModelType<T> {
      return this.#model
    }
  
    add(document: T): Promise<T> {
      return this.model.create(document)
    }
  
    async remove(id: string): Promise<any> {
      return this.model.findOneAndDelete({ _id: id } as any)
    }
  
    async findOne(
      conditions: FilterQuery<T>,
      projection?: string,
      options: QueryOptions = {},
    ): Promise<T | null> {
      return this.model.findOne(conditions, projection, options)
    }
  
    async findAll(
      filter: FilterQuery<T> = {},
      projection?: string,
      options: QueryOptions = {},
    ): Promise<T[]> {
      return this.model.find(filter, projection, options)
    }
  
    async update(
      filter: FilterQuery<T>,
      doc: UpdateQuery<T> = {},
      options: any = {},
    ): Promise<Query<any, T>> {
      return this.model.findByIdAndUpdate(filter, doc, options)
    }
  }
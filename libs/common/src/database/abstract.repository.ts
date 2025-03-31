import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";
import { AbstractDocument } from "./abstract.schema";
import { Logger, NotFoundException } from "@nestjs/common";

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) { }

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    try {
      const createdDocument = new this.model({
        ...document,
        _id: new Types.ObjectId(),
      });
      const savedDocument = await createdDocument.save();
      return savedDocument.toJSON() as TDocument;
    } catch (error) {
      this.logger.error('Failed to create document', error);
      throw error;
    }
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery).lean<TDocument>();

    if (!document) {
      this.handleNotFound(filterQuery);
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, { new: true })
      .lean<TDocument>();

    if (!document) {
      this.handleNotFound(filterQuery);
    }

    return document;
  }

  async find(
    filterQuery: FilterQuery<TDocument>,
    options?: { skip?: number; limit?: number }
  ): Promise<TDocument[]> {
    return this.model
      .find(filterQuery)
      .skip(options?.skip || 0)
      .limit(options?.limit || 0)
      .lean<TDocument[]>();
  }

  async findOneAndDelete(filterQuery: FilterQuery<TDocument>): Promise<TDocument | null> {
    const document = await this.model
      .findOneAndDelete(filterQuery)
      .lean<TDocument>();

    if (!document) {
      this.handleNotFound(filterQuery);
    }

    return document;
  }

  protected handleNotFound(filterQuery: FilterQuery<TDocument>): never {
    this.logger.warn(`Document not found with filter query: ${JSON.stringify(filterQuery)}`);
    throw new NotFoundException('Document not found');
  }
}

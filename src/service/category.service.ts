import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions
} from 'mongoose';
import Category, { CategoryDocument } from '../model/category.model';

export function createCategory(input: DocumentDefinition<CategoryDocument>) {
  return Category.create(input);
}

export function findCategory(
  query: FilterQuery<CategoryDocument>,
  options: QueryOptions = { lean: true }
) {
  return Category.findOne(query, {}, options).exec();
}

export function findAndUpdate(
  query: FilterQuery<CategoryDocument>,
  update: UpdateQuery<CategoryDocument>,
  options: QueryOptions
) {
  return Category.updateOne(query, update, options);
}

export function deleteCategory(query: FilterQuery<CategoryDocument>) {
  return Category.deleteOne(query);
}
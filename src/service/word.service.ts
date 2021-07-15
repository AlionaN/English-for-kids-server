import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions
} from 'mongoose';
import Word, { WordDocument } from '../model/word.model';

export function createWord(input: DocumentDefinition<WordDocument>) {
  return Word.create(input);
}

export function findWord(
  query: FilterQuery<WordDocument>,
  options: QueryOptions = { lean: true }
) {
  return Word.findOne(query, {}, options);
}

export function findAndUpdate(
  query: FilterQuery<WordDocument>,
  update: UpdateQuery<WordDocument>,
  options: QueryOptions
) {
  return Word.findOneAndUpdate(query, update, options);
}

export function deleteWord(query: FilterQuery<WordDocument>) {
  return Word.deleteOne(query);
}

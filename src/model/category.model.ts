import mongoose from 'mongoose';

export interface CategoryDocument extends mongoose.Document {
  title: string,
  imgUrl: string,
  createdAt: Date,
  updatedAt: Date,
  comparePassword(candidatePassword: string): Promise<boolean>
}

const CategorySchema = new mongoose.Schema(
  {
    title: {type: String, required: true},
    imgUrl: {type: String, required: false}
  },
  {timestamps: true}
);

const Category = mongoose.model<CategoryDocument>('Category', CategorySchema);

export default Category;

import mongoose from 'mongoose';

export interface WordDocument extends mongoose.Document {
  title: string,
  imgUrl: string,
  createdAt: Date,
  updatedAt: Date,
  comparePassword(candidatePassword: string): Promise<boolean>
}

const WordSchema = new mongoose.Schema(
  {
    title: {type: String, required: true},
    imgUrl: {type: String, required: false}
  },
  {timestamps: true}
);

const Word = mongoose.model<WordDocument>('Word', WordSchema);

export default Word;

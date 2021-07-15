import { object, string, ref } from 'yup';

const payload = {
  body: object({
    categoryId: string().required('Category id is required'),
    imgUrl: string(),
    audioUrl: string().required('Audio file is required'),
    enName: string().required('English word is required'),
    ruName: string().required('Translation is required'),
    trainClick: string(),
    failureClick: string(),
    successClick: string(),
  })
};

export const createWordSchema = object({
  ...payload,
});

const params = {
  params: object({
    wordid: string().required('Word id is required'),
  }),
};

export const updateWordSchema = object({
  ...params,
  ...payload,
});

export const deleteWordSchema = object({
  ...params,
});
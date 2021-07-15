import { object, string, ref } from 'yup';

const payload = {
  body: object({
    title: string().required('Title is requires'),
    imgUrl: string()
  })
};

export const createCategorySchema = object({
  ...payload,
});

const params = {
  params: object({
    catid: string().required('Category id is required'),
  }),
};

export const updateCategorySchema = object({
  ...params,
  ...payload,
});

export const deleteCategorySchema = object({
  ...params,
});
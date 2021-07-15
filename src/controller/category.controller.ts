import { Request, Response } from 'express';
import { get } from 'lodash';
import { createCategory, findCategory, findAndUpdate, deleteCategory } from '../service/category.service';
import Category from '../model/category.model';

export async function createCategoryHandler(req: Request, res: Response) {
  const userId = get(req, 'user._id');
  const body = req.body;
  const category = await createCategory({...body, user: userId});

  return res.send(category);
}

export async function updateCategoryHandler(req: Request, res: Response) {
  const userId = get(req, 'user._id');
  const categoryId = get(req, 'params.catid');
  const update = req.body;
  const category = await findCategory({ _id: categoryId });
  if (!category) {
    return res.sendStatus(404);
  }

  // @ts-ignore
  if(String(category.user) !== userId) {
    return res.sendStatus(401);
  }

  const updatedCategory = await findAndUpdate({ _id: categoryId }, update, {new: true});
  return res.send(updatedCategory);
}

export async function deleteCategoryHandler(req: Request, res: Response) {
  const userId = get(req, 'user._id');
  const categoryId = get(req.body, 'params.catid');
  const category = await findCategory({ _id: categoryId });
  
  if (!category) {
    return res.sendStatus(404);
  }

  // @ts-ignore
  if(String(category.user) !== String(userId)) {
    return res.sendStatus(401);
  }

  await deleteCategory({ categoryId });

  return res.sendStatus(200);
}

export async function getCategoriesHandler(req: Request, res: Response) {
  const categoryId = get(req, 'params.catid');

  if (categoryId) {
    const category = await findCategory({ _id: categoryId }); 

    if (!category) {
      return res.sendStatus(404);
    }
  
    return res.send(category);
  } else {
    const categories = await Category.find({});

    if(!categories) {
      return res.sendStatus(404);
    }

    return res.send(categories);
  }
  
}
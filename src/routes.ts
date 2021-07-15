import { Express, Request, Response } from 'express';
import { createUserHandler } from './controller/user.controller';
import { createUserSessionHandler, invalidateUserSessionHandler, getUserSessionsHandler } from './controller/session.controller';
import { validateRequest, requiresUser } from './middleware';
import {
  createUserSchema,
  createUserSessionSchema } from './schema/user.schema';
import {
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema
} from './schema/category.schema';
import {
  createWordSchema,
  updateWordSchema,
  deleteWordSchema
} from './schema/word.schema';
import {
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
  getCategoriesHandler
} from './controller/category.controller';
import {
  createWordHandler,
  updateWordHandler,
  deleteWordHandler,
  getWordsHandler
} from './controller/word.controller';

export default function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  // Register user
  // POST /api/user
  app.post('/api/users', validateRequest(createUserSchema), createUserHandler);


  //Login
  // POST /api/sessions
  app.post('/api/sessions',
  validateRequest(createUserSessionSchema),
  createUserSessionHandler);

  // Get user`s session
  // GET /api/sessions
  app.get('/api/sessions', requiresUser, getUserSessionsHandler);

  //Logout
  // DELETE /api/sessions
  app.delete('/api/sessions', requiresUser, invalidateUserSessionHandler);


  // GET /api/categories /api/categories/:id
  app.get('/api/categories/:catid', getCategoriesHandler);
  app.get('/api/categories', getCategoriesHandler);

  // POST /api/categories
  app.post('/api/categories', 
  [requiresUser, validateRequest(createCategorySchema)],
  createCategoryHandler);

  // DELETE /api/categories/:id
  app.delete('/api/categories/:catid',
  [requiresUser, validateRequest(deleteCategorySchema)],
  deleteCategoryHandler);

  // PUT /api/categories/:id
  app.put('/api/categories/:catid', 
  [requiresUser, validateRequest(updateCategorySchema)],
  updateCategoryHandler);
  
  // GET /api/words /api/words/:id
  app.get('/api/words/:wordid', getWordsHandler);

  // POST /api/words
  app.post('/api/words', 
  [requiresUser, validateRequest(createWordSchema)],
  createWordHandler);

  // DELETE /api/words/:id
  app.delete('/api/words/:wordid',
  [requiresUser, validateRequest(deleteWordSchema)],
  deleteWordHandler);

  // PUT /api/words/:id
  app.put('/api/words/:wordid', 
  [requiresUser, validateRequest(updateWordSchema)],
  updateWordHandler);

}
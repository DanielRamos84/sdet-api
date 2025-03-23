import { randTextRange } from '@ngneat/falso';
import config from '../../config/base.config';
import categoryController from '../../controller/categories.controller';
import { login, createCategory, deleteCategory } from '../../utils/helper';

const createNewCategoryName = (): { name: string } => ({
  name:
    randTextRange({ min: 10, max: 20 }) + Math.floor(Math.random() * 1000000),
});

describe('Categories tests', () => {
  let token: string;
  let response: any;

  beforeAll(async () => {
    token = await login(config.email, config.password);
  });

  describe('Get /categories', () => {
    test('Should return list of categories', async () => {
      const response = await categoryController.getCategories();
      expect(Object.keys(response.body[0])).toEqual(['_id', 'name']);
      expect(response.status).toEqual(200);
    });

    test('Should return category not found error', async () => {
      const expectedError = 'Category not found.';
      const categoryName = createNewCategoryName();
      response = await createCategory(categoryName, token);
      await deleteCategory(response.body._id, token);
      const getResponse = await categoryController.getIndividualCategory(
        response.body._id
      );
      expect(getResponse.body).toEqual({ error: expectedError });
    });
  });

  describe('Post /categories', () => {
    test('Should return Access Denied error passing invalid token', async () => {
      const expectedError = 'Invalid token';
      const invalidToken = 'abc';
      const categoryName = createNewCategoryName();
      const response = await createCategory(categoryName, invalidToken);
      expect(response.body).toEqual({ error: expectedError });
      expect(response.status).toEqual(403);
    });

    test('Should create a new category', async () => {
      const categoryName = createNewCategoryName();
      const response = await createCategory(categoryName, token);
      expect(Object.keys(response.body)).toEqual(['name', '_id', '__v']);
      expect(response.body).toMatchObject(categoryName);
      expect(response.status).toEqual(200);
      await deleteCategory(response.body._id, token);
    });
  });

  describe('Delete /categories', () => {
    beforeAll(async () => {
      const categoryName = createNewCategoryName();
      response = await createCategory(categoryName, token);
    });

    test('Should delete category', async () => {
      const deleteResponse = await deleteCategory(response.body._id, token);
      expect(deleteResponse.status).toEqual(200);
    });
  });
});

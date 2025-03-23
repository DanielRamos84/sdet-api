import supertest from 'supertest';
import { Response } from 'superagent';
import config from '../config/base.config';
const request = supertest(config.baseUrl);

export class CategoryController {
  getCategories(): Promise<Response> {
    return request.get('/categories');
  }

  postCategory(categoryName: object, token: string): Promise<Response> {
    return request
      .post('/categories')
      .send(categoryName)
      .set('Authorization', `Bearer ${token}`);
  }

  getIndividualCategory(categoryId: string): Promise<Response> {
    return request.get(`/categories/${categoryId}`);
  }

  updateIndividualCategory(categoryId: string): Promise<Response> {
    return request.put(`/categories/${categoryId}`);
  }

  deleteCategory(categoryId: string, token: string): Promise<Response> {
    return request
      .delete(`/categories/${categoryId}`)
      .set('Authorization', `Bearer ${token}`);
  }
}

export default new CategoryController();

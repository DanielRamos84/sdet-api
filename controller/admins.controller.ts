import supertest from 'supertest';
import { Response } from 'superagent';
import config from '../config/base.config';
const request = supertest(config.baseUrl);

export class AdminController {
  adminLogin(credentials: { email: string; password: string }): Promise<Response> {
    return request.post('/admin/login').send(credentials);
  }
}

export default new AdminController();

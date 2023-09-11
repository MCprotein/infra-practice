import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getHello(): Promise<any> {
    return await lastValueFrom(
      this.httpService
        .get('https://jsonplaceholder.typicode.com/posts?_limit=5')
        .pipe(map((response) => response.data)),
    );
  }
}

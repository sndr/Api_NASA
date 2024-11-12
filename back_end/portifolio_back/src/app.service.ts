import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  api_root = "https://images-api.nasa.gov/"
  lua = "https://images-assets.nasa.gov/image/as11-40-5874/as11-40-5874~orig.jpg";


  getHello(): string {
    return 'Hello World!';
  }

  getLua(): string{
    return `<img src="${this.lua}" alt="NASA Image" style="max-width: 100%; height: auto; object-fit: cover;">
    <p>TESTE</p>`;
  }
}
